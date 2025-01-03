import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import useGetPredictions from "../hooks/useGetPredictions";
import Predictions from "../components/Predictions";
import Spinner from "../components/Spinner";
import { MdDelete } from "react-icons/md";
import Suggestions from "./Suggestions";
import { FaInfoCircle } from "react-icons/fa";
import { DiagonalViewOverlay, FrontViewOverlay, TopViewOverlay } from "./AR/ARWebcam";

const videoConstraints = {
  width: 720,
  height: 540,
  facingMode: "environment",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [uiState, setUIState] = useState("capture");
  const [uploading, setUpLoading] = useState(false);
  const { loading, getPredictions } = useGetPredictions();
  const [data, setData] = useState(null);
  const [captureData, setCaptureData] = useState([]);

  const overlays = [
    {
      i: 0,
      val: <FrontViewOverlay />
    },
    {
      i: 1,
      val: <DiagonalViewOverlay />
    },
    {
      i: 2,
      val: <TopViewOverlay />
    },
    {
      i: 3,
      val: <FrontViewOverlay />
    }
  ];

  const handleImageUpload = (imgUrl) => {
    setCaptureData((prevData) => [...prevData, imgUrl]);
  };

  const capturePhoto = useCallback(async () => {
    const imageSrc = await webcamRef.current.getScreenshot();

    setUpLoading(true);
    const publicUrl = await uploadToCloudinary(imageSrc);
    setUpLoading(false);

    handleImageUpload(publicUrl);
  }, [webcamRef]);

  const handleDeletion = (image) => {
    setCaptureData((prevData) => prevData.filter((url) => url !== image));
  };

  const handleRefresh = () => {
    setCaptureData([]);
    setData(null);
  };

  const handlePredictions = async () => {
    setUIState("loading");
    const predData = await getPredictions(captureData);
    setData(predData);
    setUIState("result");
  };

  const resetToCapture = () => {
    setUIState("capture");
    setCaptureData([]);
    setData(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {uiState === "capture" && (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4">
          <div className="relative w-full h-auto border-2 border-dashed border-blue-600 p-4">
            <div className="flex w-full items-center justify-center mb-4 gap-2 text-sm text-gray-600">
              <FaInfoCircle className="mt-0.5" />
              <span>Follow the Angle instructions & try to fit the crop insidee the Yellow box.</span>
            </div>

            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              mirrored={true}
              className="relative z-10 w-full h-96"
            />
            {/* AR Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {overlays[captureData.length]?.val}
            </div>
          </div>

          <div className="flex gap-4 w-full items-center justify-center ml-8 lg:ml-12">
            <button
              onClick={capturePhoto}
              disabled={uploading}
              className="primary-button-new w-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-400"
            >
              {uploading ? <Spinner /> : "Capture"}
            </button>
            <button
              onClick={handleRefresh}
              className="primary-button-new w-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-400"
            >
              Refresh
            </button>
          </div>

          <div className="flex gap-2 w-full flex-wrap justify-center mt-6">
            {captureData.map((image, idx) => (
              <div className="relative w-60 h-60 border-2 border-gray-300" key={idx}>
                <img src={image} alt={`Captured ${idx}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleDeletion(image)}
                  className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 shadow"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>

          {captureData.length === 3 && (
            <div className="flex w-full -mt-4">
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

      {uiState === "loading" && loading && (
        <div className="flex items-center justify-center w-[40%] h-[40%] lg:w-[25%] lg:h-[25%] -translate-y-24">
          <img src="gifend.gif" alt="loading img" className="w-full object-contain" />
        </div>
      )}

      {uiState === "result" && (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl px-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Uploaded Images</h2>
          <div className="flex gap-4 flex-wrap">
            {captureData.map((image, idx) => (
              <div className="uploaded-row max-h-full" key={idx}>
                <div className="relative">
                  <img src={image} alt={`Uploaded ${idx}`} className="w-32 h-32 object-cover" />
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Predictions</h2>
          {data && <Predictions data={data} />}

          <h2 className="text-2xl font-semibold mt-6 mb-4">Suggestions</h2>
          {data && <Suggestions keys={data.pesticides} />}

          <div className="w-full flex items-center justify-center ml-7">
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
  );
};

export default Camera;