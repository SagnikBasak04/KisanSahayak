import { useState } from "react";
import toast from "react-hot-toast";
import { useEnrollmentContext } from "../context/EnrollmentContext";

const useUpdateMetadata = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { enrolledUser } = useEnrollmentContext();

    const update = async () => {
        const body = {
            correct: enrolledUser.correct,
            incorrect: enrolledUser.incorrect,
            greenPoints: enrolledUser.greenPoints
        }
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/update-metadata/${enrolledUser._id}`, {
                method: "PATCH",
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
                toast.success("Stats updated successfully");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, update }
}

export default useUpdateMetadata;