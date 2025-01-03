import express from "express";
import { createDummyMetaData, deleteImage, getAdminToken, getImages } from "../controllers/admin.controller.js";
import verifyAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/token", getAdminToken);
router.get("/images", verifyAdmin, getImages);
router.delete("/delete-image/:id", verifyAdmin, deleteImage);
router.post("/dummy-metadata/:id", verifyAdmin, createDummyMetaData);

export default router;