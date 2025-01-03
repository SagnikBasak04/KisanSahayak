import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/logout/${authUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("KS-token");
            localStorage.removeItem("KS-user");
            localStorage.removeItem("KS-enrolledUser");
            setAuthUser(null);

            if (data) {
                toast.success("Logged out successfully");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout };
}

export default useLogout;