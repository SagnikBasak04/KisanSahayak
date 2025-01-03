import express from "express";
import { analysis, analysis2, analysis3 } from "../controllers/analysis.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/analysis/:id", verifyToken, analysis);
router.get("/personalized/:id", verifyToken, analysis2);
router.post("/regional-analysis", verifyToken, analysis3);

export default router;