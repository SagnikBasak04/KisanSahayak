import express from "express";

const router = express.Router();

router.post("/signup");
router.post("/login");
router.post("/logout");

export default router;