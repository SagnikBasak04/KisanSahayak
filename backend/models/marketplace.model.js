import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
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
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;