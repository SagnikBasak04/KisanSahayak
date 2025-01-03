import { useCallback, useRef, useState } from 'react';
import "./market.css";
import Webcam from "react-webcam";
import { uploadBlobToCloudinary } from '../../utils/uploadBlobToCloudinary';
import { base64ToBlob } from '../../utils/base64ToBlob';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import useSellProduct from '../../hooks/useSellProduct';
import Navbar from '../../components/navbars/Navbar-actions';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const videoConstraints = {
	width: 450,
	height: 550,
	facingMode: 'environment'
};

const MarketplaceSell = () => {
	const [inputs, setInputs] = useState({
		product_name: '',
		image_url: '',
		seller_name: '',
		seller_type: '',
		price: null
	});
	const webcamRef = useRef(null);
	const [url, setUrl] = useState(null);
	const [uploadData, setUploadData] = useState(null);
	const [uploading, setUploading] = useState(false);
	const { loading, sell } = useSellProduct();

	const capturePhoto = useCallback(() => {
		if (webcamRef.current) {
			const imgSrc = webcamRef.current.getScreenshot();

			if (imgSrc) {
				const blob = base64ToBlob(imgSrc, 'image/png');
				const blobUrl = URL.createObjectURL(blob);
				setUrl(blobUrl);
			}
		}
	}, [webcamRef]);

	const handleUploadToCloudinary = async () => {
		setUploading(true);
		try {
			const glbUrl = await uploadBlobToCloudinary(url);
			setUploadData(glbUrl);
			setInputs({ ...inputs, image_url: glbUrl });
		} catch (error) {
			if (error instanceof Error) {
				console.log("Error in uploading image", error.message);
				toast.error(error.message);
			} else {
				console.log("An unknown error occurred");
			}
		}
	};

	const onUserMedia = (mediaStream) => {
		console.log('User media accessed:', mediaStream);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await sell(inputs);
	}

	return (
		<>
			<Navbar />

			<div className="flex w-full px-6 items-start -mt-4">
				<Link to="/marketplace" className="flex items-center gap-1 text-lg text-gray-500  hover:text-gray-600"><IoMdArrowRoundBack /> Back</Link>
			</div>

			<h1 className="-mt-2 text-center text-[50px] font-bold text-gray-700">Sell Your Products</h1>
			<div className='flex p-4 gap-1'>
				{/* Camera */}
				<div
					className="w-1/2 h-auto flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-blue-600 p-4"
				>
					{url ? (
						<img src={url} alt="captured" />
					) : (
						<div>
							<Webcam
								ref={webcamRef}
								audio={false}
								screenshotFormat="image/png"
								videoConstraints={videoConstraints}
								onUserMedia={onUserMedia}
								mirrored={false}
								screenshotQuality={1}
							/>

							<div className="flex items-center justify-center">
								<button className="border-none outline-none w-1/2 mt-6 rounded-2xl p-2 text-white font-medium bg-blue-700 hover:bg-blue-500" onClick={capturePhoto}>Capture</button>
							</div>
						</div>
					)}
					{url && !uploadData && (
						<div className="flex gap-2 w-full">
							<button className="border-none outline-none w-1/2 mt-6 rounded-2xl p-2 text-white font-medium bg-blue-700 hover:bg-blue-500" onClick={() => setUrl(null)}>Refresh</button>
							<button
								className="border-none outline-none w-1/2 mt-6 rounded-2xl p-2 text-white font-medium bg-blue-700 hover:bg-blue-500"
								disabled={uploading}
								onClick={handleUploadToCloudinary}
							>
								{uploading ? <Spinner /> : <span>Upload</span>}
							</button>
						</div>
					)}
				</div>

				{/* Form */}
				<div className='form-outer w-1/2'>
					<h2 style={{ fontSize: "30px", fontWeight: "bold" }}>INPUT DETAILS</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label>Name of crop:</label>
							<input
								type="text"
								id="input1"
								placeholder="Enter name of crop here"
								value={inputs.product_name}
								onChange={(e) => setInputs({ ...inputs, product_name: e.target.value })}
							/>
						</div>

						<div className="flex justify-around text-brown-600">
							<label className="flex items-center">
								<input
									type="radio"
									name="seller_type"
									className="mr-2"
									value="retailer"
									onChange={(e) => setInputs({ ...inputs, seller_type: e.target.value })}
								/>
								Retailer
							</label>
							<label className="flex items-center">
								<input
									type="radio"
									name="seller_type"
									className="mr-2"
									value="farmer"
									onChange={(e) => setInputs({ ...inputs, seller_type: e.target.value })}
								/>
								Farmer
							</label>
						</div>

						{inputs?.seller_type === "" ? (
							<div className='mb-3'></div>
						) : (
							inputs.seller_type === "farmer" ? (
								<div className="form-group">
									<label>Name of Farmer:</label>
									<input
										type="text"
										id="input2"
										placeholder="Enter your name here"
										value={inputs.seller_name}
										onChange={(e) => setInputs({ ...inputs, seller_name: e.target.value })}
									/>
								</div>
							) : (
								<div className="form-group">
									<label>Name of Retailer:</label>
									<input
										type="text"
										id="input2"
										placeholder="Enter the name of your Enterprise"
										value={inputs.seller_name}
										onChange={(e) => setInputs({ ...inputs, seller_name: e.target.value })}
									/>
								</div>
							)
						)}

						<div className="form-group">
							<label>Price of the crop per kg:</label>
							<input
								type="text"
								id="input3"
								placeholder="Enter price of crop here"
								value={inputs.price}
								onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
							/>
						</div>

						<button type="submit" className='primary-button-new bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-400' disabled={loading}>{loading ? <Spinner /> : "Sell"}</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default MarketplaceSell;
