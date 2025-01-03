import tensorflow as tf
import base64
import numpy as np
import urllib
import os
import cv2

cnn = tf.keras.models.load_model('./trained_model.h5')

def preprocess_and_decode(self,img_str, new_shape=[128,128]):
	img = tf.io.decode_base64(img_str)
	img = tf.image.decode_jpeg(img, channels=3)
	img = tf.image.resize(img, new_shape, method=tf.image.ResizeMethod.BILINEAR)
	img = tf.reshape(img,(1,) + img.shape)
	return img

def encode(self,path):
	with open(path, "rb") as image2string: 
		converted_string = base64.urlsafe_b64encode(image2string.read())
	b64 = converted_string.decode("utf8")

def preprocess_and_decode(img_str, new_shape=[128,128]):
	img = tf.io.decode_base64(img_str)
	img = tf.image.decode_jpeg(img, channels=3)
	img = tf.image.resize(img, new_shape, method=tf.image.ResizeMethod.BILINEAR)
	img = tf.reshape(img,(1,) + img.shape)
	return img



class_names = ['Corn___Common_Rust',
  'Corn___Gray_Leaf_Spot',
  'Corn___Healthy',
  'Corn___Northern_Leaf_Blight',
  'Potato___Early_Blight',
  'Potato___Healthy',
  'Potato___Late_Blight',
  'Rice___Brown_Spot',
  'Rice___Healthy',
  'Rice___Leaf_Blast',
  'Rice___Neck_Blast',
  'Sugarcane___Bacterial_Blight',
  'Sugarcane___Healthy',
  'Sugarcane___Red_Rot',
  'Wheat___Brown_Rust',
  'Wheat___Healthy',
  'Wheat___Yellow_Rust']

def get_crop_disease(data):
	return tuple(data.split('___'))

def encode(path):
	with open(path, "rb") as image2string: 
		converted_string = base64.urlsafe_b64encode(image2string.read())
	b64 = converted_string.decode("utf8")
	return b64

def predict_class(img_path):
    b64 = encode(img_path)
    image_arr = preprocess_and_decode(b64)
    os.remove(img_path)
    pred = cnn.predict(image_arr)
    data = class_names[np.argmax(pred,axis=1).item()]
    return get_crop_disease(data)

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

