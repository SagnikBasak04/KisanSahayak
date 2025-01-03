import { useState } from "react";
import toast from "react-hot-toast";

const useGetIsElevatedUser = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const isElevatedUser = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/isElevatedUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data.elevatedUser;
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, isElevatedUser }
}

export default useGetIsElevatedUser;