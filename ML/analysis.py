import numpy as np
import pickle


f = open("./crop_prediction_model.pkl", 'rb')
clf_crops = pickle.load(f)

f = open("./disease_prediction_model.pkl", 'rb')
clf_disease = pickle.load(f)

f = open("./label_encoder.pkl", 'rb')
le = pickle.load(f)

f = open("./multi_label_binarizer.pkl", 'rb')
mlb = pickle.load(f)


def predict_and_save_to_json(rainfall, N, P, K, pH, temperature, humidity):
    input_data = np.array([[rainfall, N, P, K, pH, temperature, humidity]])

    crops_prediction = clf_crops.predict(input_data)
    predicted_crops = mlb.inverse_transform(crops_prediction)

    disease_prediction = clf_disease.predict(input_data)
    predicted_disease = le.inverse_transform(disease_prediction)

    crop_list = [i.strip("'").strip("[").strip("]").strip("'") for i in list(predicted_crops[0])]
    print(crop_list)
    predictions = {
        "predictions": {
            "crops": crop_list if predicted_crops else [],
            "diseases": list(predicted_disease)
        }
    }
    return predictions