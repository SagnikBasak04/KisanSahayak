import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { EXPO_API_URL } from "@env";
import cleanUpToken from "../utils/cleanUpToken";

const useGetPersonalizedAnalysis = () => {
    const [loading, setLoading] = useState<boolean>();
    const apiUrl = EXPO_API_URL
    const { authUser } = useAuthContext();

    const personalizedAnalysis = async () => {
        const token = await cleanUpToken();
        console.log(token);
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/dashboard/personalized/${authUser._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, personalizedAnalysis }
}

export default useGetPersonalizedAnalysis;