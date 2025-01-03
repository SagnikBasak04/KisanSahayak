import Image from "../models/image.model.js";
import Metadata from "../models/metadata.model.js";
import jwt from "jsonwebtoken";

export const getAdminToken = async (req, res) => {
    try {
        const { password } = req.body;
        const adminPassword = process.env.ADMIN_PASSWORD;

        console.log({password, adminPassword});

        if (password !== adminPassword) {
            return res.status(401).json({ error: "Invalid Admin Credentials" });
        }

        const payload = {
            adminPassword,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
        return res.status(200).json(token);
    } catch (error) {
        console.log("Error in getting Admin Token", error);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getImages = async (req, res) => {
    const limit = 200;
    const page = parseInt(req.query.page) || 1;

    try {
        const totalImages = await Image.countDocuments();
        const images = await Image.find({})
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            totalImages,
            currentPage: page,
            totalPages: Math.ceil(totalImages / limit),
            images,
        });
    } catch (error) {
        console.log("Error in getImages admin controller", error);
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const deleteImage = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedImage = await Image.findByIdAndDelete(id);

        if (deletedImage) {
            res.status(200).json({
                message: "Image deleted successfully",
                image: deletedImage,
            });
        } else {
            res.status(404).json({ error: "Image not found" });
        }
    } catch (error) {
        console.log("Error in deleteImageById admin controller", error);
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const createDummyMetaData = async (req, res) => {
    try {
        const id = req.params.id;
        const newMetadata = new Metadata({
            user: id,
            totalGP: 500
        });

        if (newMetadata) {
            await newMetadata.save();
            res.status(201).json(newMetadata);
        } else {
            res.status(400).json({ error: "Invalid data provided for creating metdata" });
        }
    } catch (error) {
        console.log("Error in creating dummy metadata", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}