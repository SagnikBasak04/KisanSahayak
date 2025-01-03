import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const apiUrl = import.meta.env.VITE_API_URL;

	const login = async ({ phoneno, password }) => {
		const success = handleInputErrors({ phoneno, password });

		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${apiUrl}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
				},
				body: JSON.stringify({ phoneno, password })
			});
			const data = await res.json();

			if (data.error) {
				throw new Error(data.error)
			}

			localStorage.setItem("KS-token", data.token);
			localStorage.setItem("KS-user", JSON.stringify(data));
			setAuthUser(data);
			
			if (data) {
				toast.success("Logged in successfully");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	return { loading, login }
}

export default useLogin;


function handleInputErrors({ phoneno, password }) {
	if (!phoneno || !password) {
		toast.error("Please fill all the fields");
		return false;
	}

	if (phoneno.length !== 10) {
		toast.error("Enter a Valid phoneno");
		return false;
	}

	if (password.length < 6) {
		toast.error("password should be atleast 6 characters long");
		return false;
	}

	return true;
}