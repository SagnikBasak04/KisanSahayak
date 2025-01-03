export const blobToBase64 = async (blobUrl) => {
    try {
        // Fetch the Blob data from the URL
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        // Create a FileReader to convert the Blob to base64
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // The result contains the base64 string
                const base64Data = reader.result.split(',')[1]; // Extract base64 string only
                resolve(base64Data);
            };
            reader.onerror = reject;

            // Read the Blob as a Data URL (base64 encoded)
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error converting Blob to base64: ", error);
        return null;
    }
};
