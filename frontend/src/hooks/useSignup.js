import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { validateAndFormatDate } from "../utils/dateValidator";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const apiUrl = import.meta.env.VITE_API_URL;

	const signup = async ({
		name,
		phoneno,
		password,
		day,
		month,
		year,
		gender,
		crops
	}) => {
		const dob = validateAndFormatDate(day, month, year)

		const success = handleInputErrors({ name, phoneno, password, day, month, year, gender, crops, dob });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${apiUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
				},
				body: JSON.stringify({ name, phoneno, password, dob, gender, crops })
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("KS-token", data.token);
			localStorage.setItem("KS-user", JSON.stringify(data));
			setAuthUser(data);

			if (data) {
				toast.success("Signed up successfully");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}
	return { loading, signup };
}

export default useSignup;


//Validators
function handleInputErrors({ name, phoneno, password, day, month, year, gender, crops, dob }) {
	if (!name || !phoneno || !password || !day | !month || !year || !gender || !crops) {
		toast.error("Please fill all the fields");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password should be atleast 6 characters long");
		return false;
	}

	if (phoneno.length !== 10) {
		toast.error("Enter a valid mobile no.");
		return false;
	}

	if (crops.length < 1) {
		toast.error("Atleast one crop should be specified to proceed");
		return false;
	}
	if (!dob) {
		toast.error("Enter a valid Date");
		return false;
	}

	return true; //success
}