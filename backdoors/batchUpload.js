const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

// MongoDB configuration
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "Alpha"; // Your database name
const COLLECTION_NAME = "images"; // Your collection name

// Cloudinary configuration
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhjyjsyvt/image/upload";
const UPLOAD_PRESET = "KisanSahayak";

// Function to upload image to Cloudinary
async function uploadToCloudinary(filePath) {
    try {
        console.log(`Uploading to Cloudinary: ${filePath}`);

        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));
        formData.append("upload_preset", UPLOAD_PRESET);

        const headers = formData.getHeaders(); // Manually get headers from formData

        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                ...headers, // Spread the headers from formData
            },
        });

        if (response.status === 200 && response.data.secure_url) {
            console.log(`Uploaded successfully: ${response.data.secure_url}`);
            return response.data.secure_url;
        } else {
            console.error(`Failed to upload: ${filePath}`);
            return null;
        }
    } catch (error) {
        console.error(`Cloudinary upload failed: ${error.message}`);
        return null;
    }
}

async function uploadImagesToMongo(baseDir) {
    const client = new MongoClient(MONGO_URI);

    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        console.log("Connected to MongoDB successfully!");

        // Get folder name from baseDir to extract crop and disease
        const folderName = path.basename(baseDir);
        if (folderName.includes("__")) {
            const [crop, disease] = folderName.split("__");

            // Clean the disease name by removing leading underscore
            const cleanedDisease = disease.startsWith("_") ? disease.slice(1) : disease;

            console.log(`Processing Folder: ${folderName} | Crop: ${crop}, Disease: ${cleanedDisease}`);

            // Read only files in the baseDir folder
            const files = fs.readdirSync(baseDir)
                .filter(file => file.toLowerCase().endsWith(".jpg") || file.toLowerCase().endsWith(".png"));

            // Get first 50 and last 50 images
            const first50 = files.slice(0, 50);
            const last50 = files.slice(-50);
            const selectedFiles = [...first50, ...last50];

            for (const file of selectedFiles) {
                const filePath = path.join(baseDir, file);
                console.log(`Found Image: ${filePath}`);
                const imageUrl = await uploadToCloudinary(filePath);

                if (imageUrl) {
                    const document = {
                        image_url: imageUrl,
                        crop,
                        disease: cleanedDisease, // Use the cleaned disease name
                    };

                    await collection.insertOne(document);
                    console.log(`Saved to MongoDB: ${filePath}`);
                } else {
                    console.log(`Failed to upload image: ${filePath}`);
                }
            }
        } else {
            console.log(`Skipping folder (invalid format): ${folderName}`);
        }

        console.log("Image upload process completed successfully.");
    } catch (err) {
        console.error(`An error occurred: ${err.message}`);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

const BASE_DIR = process.env.BASE_DIR;

uploadImagesToMongo(BASE_DIR);