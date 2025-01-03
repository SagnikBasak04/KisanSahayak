import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

export const uploadBlobToCloudinary = async (imageUrl) => {
    const url = "https://api.cloudinary.com/v1_1/dhjyjsyvt/image/upload";
    const uploadPreset = "KisanSahayak2";

    const formData = new FormData();
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch blob: ${response.status}`);
        }
        const blob = await response.blob();

        // Compressing the image
        const compressedBlob = await imageCompression(blob, {
            maxSizeMB: 10, // Maximum size in MB
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        });

        formData.append("file", compressedBlob);
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
            console.error("Cloudinary Error: ", data);
            throw new Error(`Cloudinary upload failed: ${res.statusText}`);
        }

        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image: ", error);
        toast.error("Couldn't upload image");
        return null;
    }
};
