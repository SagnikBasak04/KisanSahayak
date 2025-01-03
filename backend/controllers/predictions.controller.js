import Prediction from "../models/predictions.model.js";
import { client } from "../redis/client.js";

export const uploadAndPredict = async (req, res) => {
    const apiUrl = process.env.ML_URL;

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

        const response = await fetch(`${apiUrl}/predict`, {
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

export const getPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find({});
        console.log(predictions.length);
        res.status(200).json(predictions);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getPredictionById = async (req, res) => {
    try {
        const id = req.params.id;
        const prediction = await Prediction.findById(id);
        res.status(200).json(prediction);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyHistory = async (req, res) => {
    try {
        const userId = req.params.id;

        const cachedHistory = await client.get(`userHistory:${userId}`);
        if (cachedHistory) {
            return res.status(200).json(JSON.parse(cachedHistory));
        }

        const predictions = await Prediction.find({ userId: userId });
        await client.set(`userHistory:${userId}`, JSON.stringify(predictions));
        await client.expire(`userHistory:${userId}`, 30 * 24 * 60 * 60);
        res.status(200).json(predictions);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}