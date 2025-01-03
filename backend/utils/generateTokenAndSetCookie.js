import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    //JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    //Auth cookies
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}

export default generateTokenAndSetCookie;