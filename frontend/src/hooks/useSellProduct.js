import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSellProduct = () => {
    const [loading, setLoading] = useState();
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const sell = async ({
        product_name,
        image_url,
        seller_name,
        seller_type,
        price
    }) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiUrl}/marketplace/sell`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
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
                toast.success("Item listed for selling");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, sell };
}

export default useSellProduct;