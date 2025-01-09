import tensorflow as tf
import base64
import numpy as np
import urllib
import os
import cv2
# from sklearn.metrics import accuracy
import torch.nn as F

import torch
from torchvision.transforms import ToTensor
from PIL import Image
import torch.nn as nn 
import torchvision.transforms as transforms

random_seed = 7
torch.manual_seed(random_seed)

classes = ['Corn___Healthy',
 'Potato___Early_Blight',
 'Rice___Leaf_Blast',
 'Wheat___Healthy',
 'Sugarcane___Bacterial_Blight',
 'Sugarcane___Red_Rot',
 'Sugarcane___Healthy',
 'Corn___Common_Rust',
 'Corn___Northern_Leaf_Blight',
 'Rice___Healthy',
 'Corn___Gray_Leaf_Spot',
 'Potato___Healthy',
 'Wheat___Brown_Rust',
 'Rice___Brown_Spot',
 'Rice___Neck_Blast',
 'Wheat___Yellow_Rust',
 'Potato___Late_Blight']
classes.sort()
class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        images, labels = batch
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels) # Calculate loss
        return loss

    def validation_step(self, batch):
        images, labels = batch
        out = self(images)                   # Generate prediction
        loss = F.cross_entropy(out, labels)  # Calculate loss
        acc = accuracy(out, labels)          # Calculate accuracy
        return {"val_loss": loss.detach(), "val_accuracy": acc}
    def validation_epoch_end(self, outputs):
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()       # Combine loss
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        return {"val_loss": epoch_loss, "val_accuracy": epoch_accuracy} # Combine accuracies

    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_accuracy']))

def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
             nn.BatchNorm2d(out_channels),
             nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)
# Assuming you have the same architecture defined as ResNet9
class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()

        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True) # out_dim : 128 x 64 x 64
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))

        self.conv3 = ConvBlock(128, 256, pool=True) # out_dim : 256 x 16 x 16
        self.conv4 = ConvBlock(256, 512, pool=True) # out_dim : 512 x 4 x 4
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))

        self.classifier = nn.Sequential(nn.MaxPool2d(4),
                                       nn.Flatten(),
                                       nn.Linear(512, num_diseases))

    def forward(self, xb):
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out

# Reinitialize the model with the same parameters
num_classes = len(classes)  # Replace `train.classes` with your class count if needed
model = ResNet9(3, num_classes)

# Load the model parameters
model.load_state_dict(torch.load('./plant-disease-model_new.pth', map_location=torch.device('cpu')))
model.eval()

# Move the model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Function to predict a single image
def predict_image(image_path, model, device, transform=None):
    img = Image.open(image_path).convert('RGB')
    if transform:
        img = transform(img).unsqueeze(0)
    else:
        img = ToTensor()(img).unsqueeze(0)
    img = img.to(device)

    model.eval()  # Set model to evaluation mode
    with torch.no_grad():
        outputs = model(img)
        _, predicted = torch.max(outputs, 1)
    return classes[predicted.item()]  # Replace `train.classes` with your class names list

transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor()
])

def get_crop_disease(data):
	return tuple(data.split('___'))

def encode(path):
	with open(path, "rb") as image2string: 
		converted_string = base64.urlsafe_b64encode(image2string.read())
	b64 = converted_string.decode("utf8")
	return b64

def predict_class(img_path):
    pred = predict_image(img_path, model, device, transform)
    os.remove(img_path)
    return get_crop_disease(pred)

def download_image(url, save_as):
    urllib.request.urlretrieve(url, save_as)
    
def get_crop_disease(data):
	return tuple(data.split('___'))

def get_best_img(img_list):
	return img_list[np.argmax([compute_sharpness(img) for img in img_list])]

def compute_sharpness(image_path):
    print(image_path)
    download_image(image_path, save_as='./temp.jpg')
    image = cv2.imread('./temp.jpg')
    print(type(image))
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert image to grayscale
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()  # Variance of Laplacian
    return laplacian_var

