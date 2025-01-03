import { useState } from "react"
//import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useHandlePay = () => {
	const [payLoading, setPayLoading] = useState(false);
	//const { setAuthUser } = useAuthContext();
	const apiUrl = import.meta.env.VITE_API_URL;

	const handlePay = async (prodInfo) => {
        const body = {
			id: prodInfo._id,
            product_name: prodInfo.product_name,
            product_description: `${prodInfo.seller_name} | ${prodInfo.seller_type}`,
            price: prodInfo.price,
            imageUrl: prodInfo.image_url
        }

        console.log(body);

		setPayLoading(true);
		try {
			const res = await fetch(`${apiUrl}/payment/pay`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
				},
				body: JSON.stringify(body)
			});
			const data = await res.json();

			if (data.error) {
				throw new Error(data.error)
			}

            console.log(data);
			return data;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setPayLoading(false);
		}
	}

	return { payLoading, handlePay }
}

export default useHandlePay;