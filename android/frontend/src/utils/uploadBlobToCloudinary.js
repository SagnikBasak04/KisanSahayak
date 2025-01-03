export const uploadBlobToCloudinary = async (imageUrl) => {
    const url = "https://api.cloudinary.com/v1_1/dhjyjsyvt/image/upload";
    const uploadPreset = "KisanSahayak"; 

    const formData = new FormData();
    formData.append("upload_preset", uploadPreset);

    try {
        // Fetch the Blob data from the localhost or Blob URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();

        // Append the Blob to formData
        formData.append("file", blob);

        // Upload to Cloudinary
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Upload failed: ${errorData.message || res.statusText}`);
        }

        const data = await res.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image: ", error);
        // Optionally, show a toast or alert
        // toast.error("Couldn't upload image");
        return null;
    }
};
