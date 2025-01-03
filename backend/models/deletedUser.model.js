import mongoose from "mongoose";

const DeletedUserSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
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

const DeletedUser = mongoose.model("DeletedUser", DeletedUserSchema);

export default DeletedUser;