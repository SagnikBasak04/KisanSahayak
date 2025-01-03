import { useState, useRef } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { uploadBlobToCloudinary } from "../../utils/uploadBlobToCloudinary.js";
import useGetPredictions from "../../hooks/useGetPredictions.js";
import Predictions from "../../components/Predictions.jsx";
import Spinner from "../../components/Spinner.jsx";
import Navbar from "../../components/navbars/Navbar-actions.jsx";
import Suggestions from "../../components/Suggestions.jsx";
import { FaInfoCircle } from "react-icons/fa";

const Uploader = () => {
	const inputRef = useRef(null);
	const [uiState, setUIState] = useState("capture");
	const [images, setImages] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadData, setUploadData] = useState([]);
	const [predicting, setPredicting] = useState(false);
	const [predictedData, setPredictedData] = useState(null);
	const { getPredictions } = useGetPredictions();

	const handleImageUpload = () => {
		inputRef.current?.click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const img = URL.createObjectURL(file);
			setImages((prev) => [...prev, img]);
		}
	};

	const handleUploadToCloudinary = async () => {
		setUploading(true);
		try {
			const uploadPromises = images.map(async (imageBlob) => {
				return await uploadBlobToCloudinary(imageBlob);
			});
			const cloudinaryUrls = await Promise.all(uploadPromises);
			setPredictedData(null);
			setUploadData(cloudinaryUrls);
		} catch (error) {
			console.error("Error uploading images:", error);
		} finally {
			setUploading(false);
		}
	};

	const handlePredictions = async () => {
		setPredicting(true);
		setUIState("loading");
		try {
			const predictions = await getPredictions(uploadData);
			setPredictedData(predictions);
			setUIState("result");
		} catch (error) {
			console.error("Error fetching predictions:", error);
		} finally {
			setPredicting(false);
		}
	};

	const handleDeletion = (image) => {
		setImages((prev) => prev.filter((img) => img !== image));
	};

	const handleRefresh = () => {
		setImages([]);
		setUploadData([]);
		setPredictedData(null);
	};

	const resetToCapture = () => {
		setImages([]);
		setUploadData([]);
		setPredictedData(null);
		setUIState("capture");
	};

	return (
		<>
			<Navbar />

			<div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
				{uiState === "capture" && (
					<div className="w-full max-w-2xl px-4 -mt-24">
						<div
							onClick={handleImageUpload}
							className="w-full h-auto flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-blue-600 p-4"
						>
							<div className="flex w-full items-center justify-center mb-2 gap-2 text-sm text-gray-600">
								<FaInfoCircle className="mt-0.5" />
								<span>Click here to select Images. Select 3 images to Upload & Predict.</span>
							</div>

							<div className="flex flex-col items-center gap-2">
								<MdCloudUpload className="h-[250px] w-[350px] text-blue-500" />
								{images.length === 0 && <span className="text-gray-700">No files chosen</span>}
							</div>
							<input
								type="file"
								accept="image/*"
								ref={inputRef}
								className="hidden"
								onChange={handleImageChange}
							/>
						</div>

						{images.length === 3 && (
							<div className="flex gap-4 -mt-4 w-full ml-8 lg:ml-6">
								<button
									onClick={handleUploadToCloudinary}
									disabled={images.length === 0 || uploading}
									className="primary-button-new w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-400"
								>
									{uploading ? <Spinner /> : "Upload"}
								</button>
								<button
									onClick={handleRefresh}
									className="primary-button-new w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-400"
								>
									Refresh
								</button>
							</div>
						)}

						<div className="flex gap-2 mt-4 flex-wrap justify-center">
							{images.map((image, idx) => (
								<div key={idx} className="relative w-44 h-44">
									<img src={image} alt={`Selected ${idx}`} className="w-full h-full object-cover" />
									<button
										onClick={() => handleDeletion(image)}
										className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 shadow"
									>
										<MdDelete />
									</button>
								</div>
							))}
						</div>

						{uploadData.length === 3 && (
							<div className="flex w-full -mt-4 ml-6 lg:ml-8">
								<button
									onClick={handlePredictions}
									className="primary-button-new w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-400"
								>
									Predict
								</button>
							</div>
						)}
					</div>
				)}

				{uiState === "loading" && predicting && (
					<div className="flex items-center justify-center w-[40%] h-[40%] lg:w-[25%] lg:h-[25%] -translate-y-24">
						<img src="gifend.gif" alt="loading img" className="w-full object-contain" />
					</div>
				)}

				{uiState === "result" && (
					<div className="flex flex-col items-center justify-center w-full px-10 mb-10">
						<h2 className="text-2xl font-semibold mb-4">Uploaded Images</h2>
						<div className="flex gap-4 flex-wrap">
							{uploadData.map((image, idx) => (
								<div className="uploaded-row max-h-full" key={idx}>
									<div className="relative">
										<img src={image} alt={`Uploaded ${idx}`} className="w-32 h-32 object-cover" />
									</div>
								</div>
							))}
						</div>

						<h2 className="text-2xl font-semibold mt-6 mb-4">Predictions</h2>
						{predictedData && <Predictions data={predictedData} />}

						<h2 className="text-2xl font-semibold mt-6 mb-4">Suggestions</h2>
						{predictedData && <Suggestions keys={predictedData.pesticides} />}

						<div className="w-[90%] lg:w-[80%] flex items-center justify-center ml-7 lg:ml-12">
							<button
								className="primary-button-new w-full mt-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-400"
								onClick={resetToCapture}
							>
								Predict Again
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Uploader;