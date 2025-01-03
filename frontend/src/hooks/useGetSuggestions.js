import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useGetSuggestion = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const suggestions = async (keys) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/get-suggestions/${authUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                },
                body: JSON.stringify({ keys })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, suggestions }
}

export default useGetSuggestion;