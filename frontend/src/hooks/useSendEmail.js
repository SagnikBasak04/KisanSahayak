import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast";

const useSendEmail = () => {
    const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const email = async ({ mail, message }) => {
        if(!validators({mail, message})) return;

        const emailData = {
            service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.VITE_EMAILJS_USER_ID,
            template_params: {
                from_name: authUser.name,
                from_email: mail,
                to_name: "KisanSahayak",
                message: message
            }
        };

        setLoading(true);
        try {
            const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            });

            const data = await res.text();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Email sent successfully");
            }
        } catch (error) {
            toast.error("Error in sending email");
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, email }
}

export default useSendEmail;

const validators = ({mail, message}) => {
    if(!message || !mail) {
        toast.error("Please fill all the fields");
        return false;
    }

    return true;
}