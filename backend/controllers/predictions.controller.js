import Prediction from "../models/predictions.model.js";
import { client } from "../redis/client.js";

export const uploadAndPredict = async (req, res) => {
    try {
        const {
            userId,
            url,
            location,
            rainAct,
            rainNorm,
            rainDep,
            soil_N,
            soil_K,
            soil_P,
            soil_pH,
            temp,
            hum,
        } = req.body;

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                url,
                location,
                rainAct,
                rainNorm,
                rainDep,
                soil_N,
                soil_K,
                soil_P,
                soil_pH,
                temp,
                hum,
            }),
        });
        const data = await response.json();

        const newPrediction = new Prediction({
            userId,
            url: data.url,
            location,
            crop: data.crop,
            rainAct,
            rainNorm,
            rainDep,
            soil_N,
            soil_K,
            soil_P,
            soil_pH,
            temp,
            hum,
            disease: data.disease,
            disease_details: data.disease_details,
            recomm: data.recomm,
            pesticides: data.pesticides,
        });

        if (newPrediction) {
            const prediction = await newPrediction.save();
            const history = await client.get(`userHistory:${userId}`);
            if (history) {
                await client.del(`userHistory:${userId}`);
            }

            res.status(201).json(prediction);
        } else {
            res.status(400).json({ error: "Invalid parameters" });
        }
    } catch (err) {
        console.log("Error in Generating Predictions", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};