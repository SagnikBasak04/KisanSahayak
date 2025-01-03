import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const verifyAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.adminPassword) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        if (decoded.adminPassword !== ADMIN_PASSWORD) {
            return res.status(403).json({ message: "Forbidden: Invalid admin password" });
        }

        next();
    } catch (error) {
        console.error("Error verifyAdmin middleware", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default verifyAdmin;
