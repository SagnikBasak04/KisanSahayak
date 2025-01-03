import Prediction from "../models/predictions.model.js";
import { client } from "../redis/client.js";

export const analysis = async (req, res) => {
    try {
        const { rain, soil_N, soil_K, soil_P, soil_pH, temp, hum } = req.body;
        const id = req.params.id;

        const cacheValue = await client.get(`analysis:${id}`);
        if (cacheValue) {
            console.log(cacheValue);
            return res.status(200).json(JSON.parse(cacheValue));
        }

        const response = await fetch("http://127.0.0.1:8000/analysis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rain,
                soil_N,
                soil_K,
                soil_P,
                soil_pH,
                temp,
                hum
            })
        });
        const data = await response.json();

        if (data) {
            const analysisData = { ...data, id };
            await client.set(`analysis:${id}`, JSON.stringify(analysisData));
            await client.expire(`analysis:${id}`, 30 * 60);
            res.status(200).json(analysisData);
        } else {
            res.status(400).json({ error: "Invalid parameters" });
        }
    } catch (err) {
        console.log("Error in Generating Predictions", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const analysis2 = async (req, res) => {
    try {
        const id = req.params.id;
        const predictions = await Prediction.find({ userId: id });

        if (predictions) {
            const diseaseFrequency = {};
            const pesticideFrequency = {};

            /* Creating Hash Map of pesticides & diseases */
            predictions.forEach((prediction) => {
                if (prediction.disease) {
                    diseaseFrequency[prediction.disease] = (diseaseFrequency[prediction.disease] || 0) + 1;
                }

                if (prediction.pesticides && prediction.pesticides.length > 0) {
                    prediction.pesticides.forEach((pesticide) => {
                        pesticideFrequency[pesticide] = (pesticideFrequency[pesticide] || 0) + 1;
                    });
                }
            });

            res.status(200).json({
                diseaseFrequency,
                pesticideFrequency,
            });
        } else {
            res.status(404).json({ error: "No predictions found for this user" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const analysis3 = async (req, res) => {
    try {
        const { rain, soil_N, soil_K, soil_P, soil_pH, temp, hum } = req.body;

        const response = await fetch("http://127.0.0.1:8000/analysis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rain,
                soil_N,
                soil_K,
                soil_P,
                soil_pH,
                temp,
                hum
            })
        });
        const data = await response.json();

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "Invalid parameters" });
        }
    } catch (err) {
        console.log("Error in Generating Predictions", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}