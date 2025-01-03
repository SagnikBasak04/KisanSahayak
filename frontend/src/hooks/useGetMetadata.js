import { useState } from "react";
import toast from "react-hot-toast";
import { useEnrollmentContext } from "../context/EnrollmentContext";

const useGetMetadata = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setEnrolledUser } = useEnrollmentContext();

    const metadata = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/get-metadata`, {
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

            localStorage.setItem("KS-enrolledUser", JSON.stringify(data));
            setEnrolledUser(data);
        } catch (error) {
            //toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, metadata }
}

export default useGetMetadata;