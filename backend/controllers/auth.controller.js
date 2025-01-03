import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { client } from "../redis/client.js";
import DeletedUser from "../models/deletedUser.model.js";

export const register = async (req, res) => {
    try {
        const {
            name,
            gender,
            dob,
            phoneno,
            password,
            crops
        } = req.body;

        //Validators
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be atleast 6 characters long" });
        }
        if (phoneno.length !== 10) {
            return res.status(400).json({ error: "Enter a valid Phone no." });
        }
        if (name.length < 2) {
            return res.status(400).json({ error: "Name should be atleast 2 characters long" });
        }
        if (crops.length < 1) {
            return res.status(400).json({ error: "Atleast one crop has to be specified" });
        }

        const user = await User.findOne({ phoneno });
        if (user) {
            return res.status(400).json({ error: "A user with this phone no. already exists. Use another phone no., or try logging into your account" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            gender,
            dob,
            phoneno,
            password: passwordHash,
            crops
        })

        if (newUser) {
            await newUser.save();
            const token = generateTokenAndSetCookie(newUser._id, res);
            const payload = {
                token: token,
                _id: newUser._id,
                name: newUser.name,
                password: newUser.password,
                gender: newUser.gender,
                dob: newUser.dob,
                phoneno: newUser.phoneno,
                crops: newUser.crops
            }

            await client.set(`user:${newUser._id}`, JSON.stringify(payload));
            await client.expire(`user:${newUser._id}`, 30 * 24 * 60 * 60);

            res.status(201)
                .header("Authorization", `Bearer ${token}`) // Setting Authorization header
                .json({
                    _id: newUser._id,
                    name: newUser.name,
                    gender: newUser.gender,
                    dob: newUser.dob,
                    phoneno: newUser.phoneno,
                    crops: newUser.crops,
                    token
                });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in Signing up", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { phoneno, password } = req.body;
        const user = await User.findOne({ phoneno });
        if (!user) {
            return res.status(400).json({ error: "Cannot find User" });
        }

        const isPaswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPaswordCorrect) {
            return res.status(400).json({ error: "Invalid Login Credentials" });
        }

        res.cookie("jwt", "", { maxAge: 0 });
        const token = generateTokenAndSetCookie(user._id, res);
        const payload = {
            token: token,
            _id: user._id,
            name: user.name,
            password: user.password,
            gender: user.gender,
            dob: user.dob,
            phoneno: user.phoneno,
            crops: user.crops
        }

        await client.set(`user:${user._id}`, JSON.stringify(payload));
        await client.expire(`user:${user._id}`, 30 * 24 * 60 * 60);

        res.status(200)
            .header("Authorization", `Bearer ${token}`)
            .json({
                _id: user._id,
                name: user.name,
                gender: user.gender,
                dob: user.dob,
                phoneno: user.phoneno,
                crops: user.crops,
                token
            });
    } catch (error) {
        console.log("Error in Logging in", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        const userId = req.params.id;

        res.cookie("jwt", "", { maxAge: 0 }); //Null cookie
        await client.del(`analysis:${userId}`);
        await client.del(`userHistory:${userId}`);
        await client.del(`user:${userId}`);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logging out", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const confirmPassword = await bcrypt.compare(password, user.password || "");
        if (!user || !confirmPassword) {
            return res.status(400).json({ error: "Error in conforming Delete Account request" });
        }
        const newDeletedUser = new DeletedUser({
            userId: userId,
            name: user.name,
            gender: user.gender,
            dob: user.dob,
            phoneno: user.phoneno,
            password: user.password,
            crops: user.crops,
        });
        await newDeletedUser.save();
        
        const deletedUser = await User.deleteOne({ _id: userId });

        if (deletedUser) {
            res.cookie("jwt", "", { maxAge: 0 });
            await client.del(`analysis:${userId}`);
            await client.del(`userHistory:${userId}`);
            await client.del(`user:${userId}`);
            res.status(200).json({ success: "Account Deleted Successfully" });
        } else {
            res.status(400).json({ error: "Couldn't delete your Account" });
        }
    } catch (error) {
        console.log("Error in Deleting Acc.", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}