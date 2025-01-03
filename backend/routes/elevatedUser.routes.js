import express from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { createImage, createMetaData, getImageFromBuckets, getMetaData, isElevatedUser, updateMetadata, updatePrediction } from "../controllers/elevatedUser.controller.js";
import verifyUser from "../middlewares/enrolledUser.middleware.js";
import verifyElevatedUser from "../middlewares/elevatedUser.middleware.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, verifyUser, verifyElevatedUser, updatePrediction);
router.post("/metadata", verifyToken, createMetaData);
router.get("/get-metadata", verifyToken, getMetaData);
router.get("/get-images", verifyToken, verifyUser, getImageFromBuckets);
router.patch("/update-metadata/:id", verifyToken, verifyUser, updateMetadata);
router.post("/create-image", verifyToken, verifyUser, createImage);
router.get("/isElevatedUser/:id", isElevatedUser);

export default router;