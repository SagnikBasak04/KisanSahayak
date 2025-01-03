import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { client } from "../redis/client.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // token is sent in Authorization header as Bearer Token
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedUser) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const redisKey = `user:${decodedUser.userId}`; // Unique Redis key for each user
        const payload = await client.get(redisKey);
        if (!payload) {
            return res.status(401).json({ error: "Unauthorized - No User Data in Cache, Login first" });
        }

        const data = JSON.parse(payload);
        if (data.token !== token) {
            return res.status(401).json({ error: "Unauthorized - Token Mismatch" });
        }

        const user = await User.findById(decodedUser.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User Not Found!" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("Error in verifyToken middleware", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default verifyToken;