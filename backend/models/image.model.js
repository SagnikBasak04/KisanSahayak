import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    crop: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;