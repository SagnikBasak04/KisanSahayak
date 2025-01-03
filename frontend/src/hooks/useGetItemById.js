import { useState } from "react";
//import toast from "react-hot-toast";

const useGetItemById = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    const product = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/${id}`, {
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

            return data;
        } catch (error) {
            //toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, product }
}

export default useGetItemById;