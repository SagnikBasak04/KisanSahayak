import jwt from "jsonwebtoken";
import Metadata from "../models/metadata.model.js";

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedUser) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await Metadata.findOne({ user: decodedUser.userId });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: "User Not Enrolled!" });
        }

        next();
    } catch (err) {
        console.log("Error in verifyUser middleware", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default verifyUser;
