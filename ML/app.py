from fastapi import FastAPI 
from pydantic import BaseModel 
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import predict as pd
import analysis as al
import json

class Image(BaseModel):
    userId: str
    url: list
    location: str
    rainAct: float
    rainNorm: float
    rainDep: float
    soil_N: float
    soil_P: float
    soil_K: float
    soil_pH: float
    temp: float
    hum: float

class Analysis(BaseModel):
    rain: float
    soil_N: float
    soil_P: float
    soil_K: float
    soil_pH: float
    temp: float
    hum: float

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"    
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
@app.post("/predict")
async def getPrediction (req: Image):
    print("List: ",req.url)
    best_img_url = pd.get_best_img(req.url);
    print("test",best_img_url)
    pd.download_image(best_img_url, save_as='./temp.jpg')
    crop, attribute = pd.predict_class('./temp.jpg')
    recomms_dict = json.load(open("./recommendations.json"))
    print(crop,attribute)
    dict_key = crop + "___" + attribute
    return {
        "userId":req.userId,
        "url":best_img_url,
        "location":req.location,
        "crop": crop,
        "rainAct":req.rainAct,
        "rainNorm":req.rainNorm,
        "rainDep":req.rainDep,
        "soil_N":req.soil_N,
        "soil_K":req.soil_K,
        "soil_P":req.soil_P,
        "soil_pH":req.soil_pH,
        "temp":req.temp,
        "hum":req.hum,
        "disease": attribute,
        "disease_details": recomms_dict[dict_key]["disease_details"] if attribute != "Healthy" else [],
        "recomm": recomms_dict[dict_key]["recommendations"] if attribute != "Healthy" else [],
        "pesticides": recomms_dict[dict_key]    ["pesticides"] if attribute != "Healthy" else []
    }

@app.post('/analysis')
async def getAnalysis(req: Analysis):
    return al.predict_and_save_to_json(
        req.rain,
        req.soil_N,
        req.soil_P,
        req.soil_K,
        req.soil_pH,
        req.temp,
        req.hum
    )   