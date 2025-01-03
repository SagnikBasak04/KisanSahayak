import Metadata from "../models/metadata.model.js";

export const createMetaData = async (req, res) => {
    try {
        const id = req.user._id;
        const newMetadata = new Metadata({
            user: id
        });

        if (newMetadata) {
            await newMetadata.save();
            res.status(201).json(newMetadata);
        } else {
            res.status(400).json({ error: "Invalid data provided for creating metdata" });
        }
    } catch (error) {
        console.log("Error in creating metadata", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getMetaData = async (req, res) => {
    try {
        const id = req.user._id;
        const metadata = await Metadata.findOne({ user: id });

        if (metadata) {
            res.status(201).json(metadata);
        } else {
            res.status(400).json({ error: "Error in fetching metadata" });
        }
    } catch (error) {
        console.log("Error in get metadata", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}