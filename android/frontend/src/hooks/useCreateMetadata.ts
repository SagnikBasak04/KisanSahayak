import { useState } from "react";
import { useEnrollmentContext } from "../context/EnrollmentContext";
import { EXPO_API_URL } from "@env";
import cleanUpToken from "../utils/cleanUpToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCreateMetadata = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;
    const { setEnrolledUser } = useEnrollmentContext();

    const createMetadata = async () => {
        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/metadata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                await AsyncStorage.setItem("KS-enrolledUser", JSON.stringify(data));
                const user = await AsyncStorage.getItem("KS-enrolledUser");
                console.log(user);
                setEnrolledUser(data);
                // toast.success("Enrolled successfully");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, createMetadata };
}

export default useCreateMetadata;