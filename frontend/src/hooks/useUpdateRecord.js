import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateRecord = () => {
    const [enLoading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    const update = async({id, crop, disease, disease_details, recomm, pesticides}) => {
        const success = handleValidators({crop, disease, disease_details, recomm, pesticides})
        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/elevatedUser/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                },
                body: JSON.stringify({crop, disease, disease_details, recomm, pesticides})
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if(data)
            {
                toast.success("Record updated successfully");
                return data;
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return {enLoading, update}
}

export default useUpdateRecord;

function handleValidators({crop, disease, disease_details, recomm, pesticides}) {
    if(!disease || !crop) {
        toast.error("Please fill all the fields");
        return false;
    }

    if(disease !== "Healthy" && (disease_details.length === 0 || recomm.length === 0 || pesticides.length === 0)) {
        toast.error("Details, Recommendations & pesticides cannot be empty for Healthy crops");
        return false;
    }

    return true;
}