import mongoose from "mongoose";

const MetadataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    correct: {
        type: Number,
        required: true,
        default: 0
    },
    incorrect: {
        type: Number,
        required: true,
        default: 0
    },
    greenPoints: {
        type: Number,
        required: true,
        default: 0
    },
    totalGP: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const Metadata = mongoose.model("Metadata", MetadataSchema);

export default Metadata;