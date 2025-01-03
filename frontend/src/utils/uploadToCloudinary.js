import toast from "react-hot-toast";

export const uploadToCloudinary = async (base64Image) => {
    const url = "https://api.cloudinary.com/v1_1/dhjyjsyvt/image/upload";

    const uploadPreset = "KisanSahayak2"; //upload preset

    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", uploadPreset);

    try {
        const res = await fetch(url, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        return data.secure_url;
    } catch (error) {
        console.log("Error uploading image: ", error);
        toast.error("Cloudn't upload image");
        return null;
    }
}