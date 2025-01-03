import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { EXPO_API_URL } from "@env";
import cleanUpToken from "../utils/cleanUpToken";

const useGetMySellings = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;
    const { authUser } = useAuthContext();

    const sellings = async () => {
        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/sold/${authUser._id}`, {
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
    return { loading, sellings }
}

export default useGetMySellings;