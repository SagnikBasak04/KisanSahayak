import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        payment_intent_id: {
            type: String,
            required: true
        },
        product_name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        image_url: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        seller_name: {
            type: String,
            min: 2,
            required: true
        },
        seller_type: {
            type: String,
            required: true,
            enum: ['retailer', 'farmer']
        },
        amount: {
            type: Number,
            required: true
        },
        customer_name: {
            type: String,
            required: true
        },
        customer_email: {
            type: String,
            required: true
        },
        customer_mobile: {
            type: String,
            min: 10,
            max: 10,
            required: true
        },
        delivery: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;