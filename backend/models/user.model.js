import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        gender: {
            type: String,
            required: true,
            enum: ["M", "F", "O"]
        },
        dob: {
            type: String,
            required: true,
            min: 5,
        },
        phoneno: {
            type: String,
            required: true,
            min: 6,
            max: 14,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        crops: {
            type: Array,
            required: true,
            min: 1,
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;