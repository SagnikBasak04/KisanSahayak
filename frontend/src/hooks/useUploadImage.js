import { useState } from "react";
import toast from "react-hot-toast";

const useUploadImage = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const upload = async ({ image_url, crop, disease }) => {
        if (!image_url || !crop || !disease) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/create-image`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                },
                body: JSON.stringify({ image_url, crop, disease })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Contribution made Successfully");
            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, upload }
}

export default useUploadImage;