import { EXPO_API_URL } from "@env";
import { useState } from "react";
import cleanUpToken from "../utils/cleanUpToken";

const useGetIsElevatedUser = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;

    const isElevatedUser = async () => {
        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/isElevatedUser`, {
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

            return data.elevatedUser;
        } catch (error) {
            // toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, isElevatedUser }
}

export default useGetIsElevatedUser;