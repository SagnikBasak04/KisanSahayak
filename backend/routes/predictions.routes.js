import express from "express";
import { uploadAndPredict, getPredictions, getPredictionById, getMyHistory } from "../controllers/predictions.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/upload", verifyToken, uploadAndPredict);
router.get("/records", verifyToken, getPredictions);
router.get("/records/:id", verifyToken, getPredictionById);
router.get("/history/:id", verifyToken, getMyHistory);

export default router;