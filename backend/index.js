import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { client } from "./redis/client.js";
import authRoutes from "./routes/auth.routes.js";

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

app.get("/api/v1", (req, res) => {
    res.send("<h1>Server Up & Running</h1>");
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);

    connectToMongoDB();

    if (client) {
        console.log("Connected to Redis");
    } else {
        console.log("Error in connecting to Redis");
    }
});