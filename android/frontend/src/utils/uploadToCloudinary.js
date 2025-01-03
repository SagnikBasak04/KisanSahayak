//import toast from "react-hot-toast";

export const uploadToCloudinary = async (base64Image) => {
    const url = "https://api.cloudinary.com/v1_1/dhjyjsyvt/image/upload";

    const uploadPreset = "KisanSahayak"; //upload preset

    const formData = new FormData();
    const fileName = base64Image.split("/").pop();
    const file = {
        uri: base64Image,
        type: 'image/jpeg',
        name: fileName
    };

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const res = await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });

        const data = await res.json();                
        return data.secure_url;
    } catch (error) {
        console.log("Error uploading image: ", error);
        //toast.error("Cloudn't upload image");
        return null;
    }
}