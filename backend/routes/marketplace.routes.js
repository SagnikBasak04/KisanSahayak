import express from "express";
import verifyToken from "../middleware/protectRoute.js";
import { buyItem, getAllItems, getItemById, getMyOrders, getMySellings, getSuggestions, sellItem } from "../controllers/marketplace.controller.js";

const router = express.Router();

router.post("/sell", verifyToken, sellItem);
router.get("/explore/:id", verifyToken, getAllItems);
router.get("/sold/:id", verifyToken, getMySellings);
router.get("/:id", verifyToken, getItemById);
router.post("/buy", verifyToken, buyItem);
router.get("/orders/:id", verifyToken, getMyOrders);
router.post("/get-suggestions/:id", verifyToken, getSuggestions);

export default router;