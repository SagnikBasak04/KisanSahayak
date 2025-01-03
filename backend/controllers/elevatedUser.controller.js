import Image from "../models/image.model.js";
import Metadata from "../models/metadata.model.js";
import Prediction from "../models/predictions.model.js";
import { client } from "../redis/client.js";
import regexHandler from "../utils/regexHandler.js";

export const updatePrediction = async (req, res) => {
    try {
        const predictions = await Prediction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (predictions) {
            await client.del(`userHistory:${predictions.userId}`)
            res.status(200).json(predictions);
        } else {
            res.status(400).json({ error: "Couldn't Update the entry" });
        }
    } catch (error) {
        console.log("Error in updating prediction", error.message);
        res.status(500).json({ error: "Internal Server error" })
    }
}

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

export const getImageFromBuckets = async (req, res) => {
    try {
        const bucketCount = 5;
        const bucketsExist = [];

        // Checking if all buckets already exist
        for (let i = 0; i < bucketCount; i++) {
            const bucketName = `image_bucket_${i + 1}`;
            const bucketExists = await client.exists(bucketName);
            bucketsExist.push(bucketExists);
        }

        if (bucketsExist.every((exists) => exists)) {
            // If all buckets exist, fetching 2 images from each bucket
            const selectedImages = [];
            for (let i = 0; i < bucketCount; i++) {
                const bucketName = `image_bucket_${i + 1}`;
                const bucketData = await client.get(bucketName);

                if (bucketData) {
                    const bucketImages = JSON.parse(bucketData);
                    const randomImages = bucketImages
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 2); // Selecting 2 random images from each bucket
                    selectedImages.push(...randomImages); // pushing the selected images in final array
                }
            }
            const finalSet = selectedImages.sort(() => Math.random() - 0.5); // final shuffle

            return res.status(200).json(finalSet);
        }

        // If buckets don't exist, fetching images with pagination
        const limit = 200; // Fetching 200 images per batch
        let page = 0;
        let images = [];
        let hasMore = true;

        // handling pagination
        while (hasMore) {
            const batch = await Image.find({})
                .skip(page * limit)
                .limit(limit);
            images.push(...batch);
            hasMore = batch.length === limit;
            page++;
        }

        if (!images.length) {
            return res.status(400).json({ error: "No images found" });
        }

        const imagesPerBucket = Math.ceil(images.length / bucketCount);

        // Creating new buckets and storing images
        for (let i = 0; i < bucketCount; i++) {
            const bucketName = `image_bucket_${i + 1}`;
            const bucketImages = images.slice(
                i * imagesPerBucket,
                (i + 1) * imagesPerBucket
            ); // aiming for equal distribution. ie., if bucketSize = 100 & bucket 1 has 0-99 images, bucket 2 has 100-199 images & so on.
            await client.set(bucketName, JSON.stringify(bucketImages));
            await client.expire(bucketName, 30 * 24 * 60 * 60);
        }

        // Selecting 2 random images from each bucket
        const selectedImages = [];
        for (let i = 0; i < bucketCount; i++) {
            const bucketName = `image_bucket_${i + 1}`;
            const bucketData = await client.get(bucketName);
            if (bucketData) {
                const bucketImages = JSON.parse(bucketData);
                const randomImages = bucketImages
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 2);
                selectedImages.push(...randomImages);
            }
        }
        const finalSet = selectedImages.sort(() => Math.random() - 0.5);

        return res.status(200).json(finalSet);
    } catch (error) {
        console.error("Error in getImagesFromBuckets controller", error);
        return res.status(500).json({ error: "Internal Server error" });
    }
}

export const updateMetadata = async (req, res) => {
    try {
        const metadata = await Metadata.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (metadata) {
            res.status(200).json(metadata);
        } else {
            res.status(400).json({ error: "Couldn't Update your stats" });
        }
    } catch (error) {
        console.log("Error in updating metadata", error.message);
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const createImage = async (req, res) => {
    try {
        const { image_url, crop, disease } = req.body;
        if (!image_url || !crop || !disease) return res.status(400).json({ error: "All fields are required" });
        const formattedDisease = regexHandler(disease);

        const newImage = await Image({
            image_url,
            crop,
            disease: formattedDisease
        });

        if (newImage) {
            await newImage.save();
            res.status(201).json({
                _id: newImage._id,
                image_url: newImage.image_url,
                crop: newImage.crop,
                disease: newImage.disease
            });
        } else {
            res.status(400).json({ error: "Couldn't create new Image" });
        }
    } catch (error) {
        console.log("Error in creating image", error);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const isElevatedUser = async (req, res) => {
    try {
        const user = await Metadata.findOne({ user: req.params.id });

        if (user) {
            if (user.totalGP >= parseFloat(200)) return res.status(200).json({ elevatedUser: true });
            else return res.status(200).json({ elevatedUser: false });
        } else {
            return res.status(200).json({ message: "User not enrolled. Enroll first" });
        }
    } catch (error) {
        console.log("Error in getting Elevated User", error);
        res.status(500).json({ error: "Internal Server error" });
    }
}