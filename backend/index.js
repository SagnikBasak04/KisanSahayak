import "./sentry/instrument.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import * as Sentry from "@sentry/node";

import { client } from "./redis/client.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import stripe from "./stripe/stripeInit.js";

import authRoutes from "./routes/auth.routes.js";
import predictionRoutes from "./routes/predictions.routes.js";
import elevatedUserRoutes from "./routes/elevatedUser.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();
const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'baggage',
        'sentry-trace'
    ],
    credentials: true
};

app.use(cors(corOpts));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '1000mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }))
app.use(cookieParser());

// Sentry setup
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

app.get("/api/v1", (req, res) => {
    res.send("<h1>Server Up & Running</h1>");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/predictions", predictionRoutes);
app.use("/api/v1/elevatedUser", elevatedUserRoutes);
app.use("/api/v1/dashboard", analysisRoutes);
app.use("/api/v1/marketplace", marketplaceRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);

    connectToMongoDB();

    if (client) {
        console.log("Connected to Redis");
    } else {
        console.log("Error in connecting to Redis");
    }

    if (stripe) {
        console.log("Stripe Initialized");
    } else {
        console.log("Error in connecting to Stripe");
    }
});