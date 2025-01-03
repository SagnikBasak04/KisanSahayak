import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            default: []
        }
    ]
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

export default Order;