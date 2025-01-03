import stripe from "../stripe/stripeInit.js";

export const paymentHandler = async (req, res) => {
    const baseUrl = process.env.BASE_URL;
    const { id, product_name, product_description, price, imageUrl } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product_name,
                            description: product_description,
                            images: [imageUrl]
                        },
                        unit_amount: price * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true
            },
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: 'Standard Shipping',
                        type: 'fixed_amount',
                        fixed_amount: { amount: 4600, currency: 'inr' },
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 }
                        }
                    }
                }
            ],
            success_url: `${baseUrl}/complete-order?session_id={CHECKOUT_SESSION_ID}&order_id=${id}`,
            cancel_url: `${baseUrl}/cancel-order?reason=user_cancelled`,
            metadata: {
                orderId: id,
            },
            allow_promotion_codes: true
        });

        console.log(session.url);
        res.json({ url: session.url });
    } catch (err) {
        console.log("Error in paymentHandler", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}