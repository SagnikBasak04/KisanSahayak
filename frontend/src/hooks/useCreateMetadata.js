import { useState } from "react";
import toast from "react-hot-toast";
import { useEnrollmentContext } from "../context/EnrollmentContext"

const useCreateMetadata = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setEnrolledUser } = useEnrollmentContext();

    const createMetadata = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/metadata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                }
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                localStorage.setItem("KS-enrolledUser", JSON.stringify(data));
                setEnrolledUser(data);
                toast.success("Enrolled successfully");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, createMetadata };
}

export default useCreateMetadata;