import express from "express";
import { paymentHandler } from "../controllers/payment.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/pay", verifyToken, paymentHandler);

export default router;