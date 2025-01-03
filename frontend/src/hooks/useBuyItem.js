import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useBuyItem = () => {
    const [payLoading, setLoading] = useState();
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const buy = async ({ order_id, session_id }) => {
        const body = {
            order_id: order_id,
            session_id: session_id,
            user_id: authUser._id
        }
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/buy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Item Bought successfully");
                return data;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { payLoading, buy };
}

export default useBuyItem;