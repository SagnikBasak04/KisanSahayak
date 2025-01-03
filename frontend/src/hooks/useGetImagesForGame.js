import { useState } from "react";
import toast from "react-hot-toast";

const useGetImagesForGame = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getImages = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/get-images`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 4000);
        }
    }
    return { loading, getImages }
}

export default useGetImagesForGame