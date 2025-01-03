import Product from "../models/marketplace.model.js";
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import stripe from "../stripe/stripeInit.js";

export const sellItem = async (req, res) => {
    try {
        const
            {
                product_name,
                image_url,
                seller,
                seller_name,
                seller_type,
                price
            } = req.body;

        const newProduct = new Product({
            product_name,
            image_url,
            seller,
            seller_name,
            seller_type,
            price
        })

        if (newProduct) {
            console.log(newProduct);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } else {
            res.status(400).json({ error: "Invalid product data" });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAllItems = async (req, res) => {
    try {
        const loggedInUser = req.params.id;
        const products = await Product.find({ seller: { $ne: loggedInUser } });

        res.status(200).json(products);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMySellings = async (req, res) => {
    try {
        const loggedInUser = req.params.id;
        const products = await Product.find({ seller: loggedInUser });

        res.status(200).json(products);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getItemById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400).json({ error: "Cannot get product" });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const buyItem = async (req, res) => {
    try {
        const { order_id, session_id, user_id } = req.body;
        console.log({ order_id, session_id, user_id });

        const product = await Product.findById(order_id);
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent.payment_method']
        });

        if (product && session) {
            const newPayment = new Payment({
                product_id: order_id,
                payment_intent_id: session.payment_intent.id,
                product_name: product.product_name,
                image_url: product.image_url,
                seller: product.seller,
                seller_name: product.seller_name,
                seller_type: product.seller_type,
                amount: session.payment_intent.amount / 100,
                customer_name: session.customer_details.name,
                customer_email: session.customer_details.email,
                customer_mobile: session.customer_details.phone,
                delivery: `${session.payment_intent.shipping.address.line1}, ${session.payment_intent.shipping.address.line2}, ${session.payment_intent.shipping.address.city} - ${session.payment_intent.shipping.address.postal_code}, ${session.payment_intent.shipping.address.state}, ${session.payment_intent.shipping.address.country}`
            });

            if (newPayment) {
                let order = await Order.findOne({ user: user_id });
                if (!order) {
                    order = await Order.create({ user: user_id });
                }
                order.orders.push(newPayment._id);

                await Promise.all([order.save(), newPayment.save()]);
            } else {
                return res.status(400).json({ error: "Could not process payment, Refund will be processed within 5-7 days" });
            }

            const deletedProduct = await Product.deleteOne({ _id: order_id });
            console.log(deletedProduct);

            if (deletedProduct) {
                res.status(200).json({
                    product_id: newPayment.product_id,
                    product_name: newPayment.product_name,
                    image_url: newPayment.image_url,
                    seller: newPayment.seller,
                    seller_name: newPayment.seller_name,
                    seller_type: newPayment.seller_type,
                    amount: newPayment.amount,
                    customer_name: newPayment.customer_name,
                    customer_email: newPayment.customer_email,
                    customer_mobile: newPayment.customer_mobile,
                    delivery: newPayment.delivery
                });
            } else {
                res.status(400).json({ error: "Error in buying the product" });
            }
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const userOrders = await Order.findOne({ user: req.params.id });
        if (!userOrders) {
            return res.status(400).json({ error: "No orders found" });
        }

        const orderIds = userOrders.orders;
        const orders = await Payment.find({ _id: { $in: orderIds } });

        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(400).json({ error: "Error in Fetching orders" });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getSuggestions = async (req, res) => {
    try {
        const loggedInUser = req.params.id;
        const { keys } = req.body;
        console.log(keys);
        const products = await Product.find({ seller: { $ne: loggedInUser } });

        const filteredProducts = products.filter((product) =>
            keys.some((key) =>
                product.product_name.toLowerCase().includes(key.toLowerCase())
            )
        );
        console.log(filteredProducts);
        res.status(200).json(filteredProducts);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}