import express from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { createMetaData, getMetaData } from "../controllers/elevatedUser.controller.js";

const router = express.Router();

router.post("/metadata", verifyToken, createMetaData);
router.get("/get-metadata", verifyToken, getMetaData);

export default router;