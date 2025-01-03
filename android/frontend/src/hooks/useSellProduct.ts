import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { EXPO_API_URL } from "@env";
import cleanUpToken from "../utils/cleanUpToken";

const useSellProduct = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    console.log(authUser);
    const apiUrl = EXPO_API_URL;

    const sell = async ({
        product_name,
        image_url,
        seller_name,
        seller_type,
        price
    }) => {
        const token = await cleanUpToken();
        setLoading(true)
        try {
            const res = await fetch(`${apiUrl}/marketplace/sell`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_name,
                    image_url,
                    seller: authUser._id,
                    seller_name,
                    seller_type,
                    price
                })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                console.log("Item listed for selling");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, sell };
}

export default useSellProduct;