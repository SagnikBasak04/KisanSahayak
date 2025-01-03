import { EXPO_API_URL } from "@env";
import { useState } from "react";
import cleanUpToken from "../utils/cleanUpToken";

const useGetItemById = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;

    const product = async (id: String) => {
        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, product }
}

export default useGetItemById;