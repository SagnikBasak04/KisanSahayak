import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteAccount = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    const deleteAcc = async (password) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/delete-account`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data.success) {
                localStorage.removeItem("KS-token");
                localStorage.removeItem("KS-user");
                toast.success("Account Deleted Successfully");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, deleteAcc }
}

export default useDeleteAccount;