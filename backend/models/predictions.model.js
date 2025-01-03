import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    location: {
        type: String,
        max: 50,
        required: true
    },
    crop: {
        type: String,
        min: 4,
        max: 20,
        required: true
    },
    rainAct: {
        type: Number,
        required: true,
    },
    rainNorm: {
        type: Number,
        required: true,
    },
    rainDep: {
        type: Number,
        required: true,
    },
    soil_N: {
        type: Number,
        required: true,
    },
    soil_P: {
        type: Number,
        required: true,
    },
    soil_K: {
        type: Number,
        required: true,
    },
    soil_pH: {
        type: Number,
        required: true,
    },
    temp: {
        type: Number,
        required: true
    },
    hum: {
        type: Number,
        requited: true
    },
    disease: {
        type: String,
        required: true
    },
    disease_details: {
        type: Array,
        default: [],
        required: true
    },
    recomm: {
        type: Array,
        default: [],
        required: true
    },
    pesticides: {
        type: Array,
        default: [],
        required: true
    },
}, { timestamps: true });

const Prediction = mongoose.model("Prediction", PredictionSchema);

export default Prediction;