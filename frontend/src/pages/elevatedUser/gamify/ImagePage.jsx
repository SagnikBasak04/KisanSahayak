import { IoMdArrowRoundBack } from "react-icons/io";
import Navbar from "../../../components/navbars/Navbar-actions";
import { Link } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import { useRef, useState } from "react";
import { uploadBlobToCloudinary } from "../../../utils/uploadBlobToCloudinary";
import useUploadImage from "../../../hooks/useUploadImage";
import Spinner from "../../../components/Spinner";
import { FaCheck } from "react-icons/fa";
import { useEnrollmentContext } from "../../../context/EnrollmentContext";
import useUpdateMetadata from "../../../hooks/useUpdateStats";

const ImagePage = () => {
  const inputRef = useRef(null);
  const [inputs, setInputs] = useState({
    image_url: "",
    crop: "",
    disease: ""
  });
  const { loading, upload } = useUploadImage();
  const [uploading, setUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState();
  const [uploadedImage, setUploadedImage] = useState("");
  const { enrolledUser, setEnrolledUser } = useEnrollmentContext();
  const { loading: enLoading, update } = useUpdateMetadata();

  const handleImageUpload = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = URL.createObjectURL(file);
      setInputs({ ...inputs, image_url: img });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const cloudinaryUrl = await uploadBlobToCloudinary(inputs.image_url);
    setInputs({ ...inputs, image_url: cloudinaryUrl });
    setUploadedImage(cloudinaryUrl);
    setUploading(false);
  }

  const handleContribution = async () => {
    const data = await upload(inputs);
    setUploadedData(data);
    const updatedUser = {
      ...enrolledUser,
      greenPoints: enrolledUser.greenPoints + 0.03
    };

    localStorage.setItem("KS-enrolledUser", JSON.stringify(updatedUser));
    setEnrolledUser(updatedUser);
    await update();
  }

  const handleNext = () => {
    setInputs({
      image_url: "",
      crop: "",
      disease: ""
    });
    setUploadedData();
    setUploadedImage("");
  }

  console.log(uploadedData);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <div className="flex w-full px-6 items-start -mt-4">
          <Link to="/elevated-user/contribute" className="flex items-center gap-1 text-lg text-gray-500  hover:text-gray-600"><IoMdArrowRoundBack /> Back</Link>
        </div>

        <h1 className="-mt-3 text-[45px] font-bold text-gray-700 text-center">
          Contribute to our cause!
        </h1>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center gap-3 p-6 w-fit mt-8 rounded-xl shadow-2xl bg-black/10 backdrop-blur-md backdrop-filter border border-white/20 hover:scale-105 cursor-pointer mb-10">
          <h1 className="text-center text-xl font-semibold text-gray-700">Upload Images of your Own</h1>
          <div className="h-[0.9px] w-full bg-gray-400 -mt-1 rounded-full" />

          {uploadedData ? (
            <>
              <img src={uploadedData.image_url} alt={uploadedImage} className="h-[300px] w-[350px] rounded-lg mt-3" />

              <h1 className="flex items-center justify-center gap-2 text-xl font-bold text-green-700">Contribution Made! <FaCheck /></h1>

              <div>
                <span className="text-base font-medium text-gray-700">Crop: </span>
                <span className="text-base font-semibold text-gray-800">{uploadedData.crop}</span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-700">Disease: </span>
                <span className="text-base font-semibold text-gray-800">{uploadedData.disease}</span>
              </div>

              <button
                className="p-2 bg-green-700 rounded-full mt-3 w-full text-md font-semibold text-white hover:bg-green-800"
                onClick={handleNext}
              >
                Upload Again
              </button>
            </>
          ) : (
            <>
              {inputs.image_url ? (
                <img src={inputs.image_url} alt="image" className="h-[300px] w-[350px] rounded-lg mt-3" />
              ) : (
                <div
                  onClick={handleImageUpload}
                  className="w-full h-auto mt-3 flex items-center justify-center cursor-pointer border-2 border-dashed border-blue-600 p-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <MdCloudUpload className="h-[300px] w-[350px] text-blue-500" />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}

              <form className="flex flex-col gap-3 w-full mt-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-gray-800">Crop</label>
                  <input
                    className="bg-transparent py-1 px-2 w-full rounded-lg border-2 border-gray-400 text-base text-gray-700 placeholder:text-sm outline-none focus:border-gray-700"
                    type="text"
                    placeholder="Enter Crop Name"
                    value={inputs.crop}
                    onChange={(e) => setInputs({ ...inputs, crop: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-gray-800">Disease</label>
                  <input
                    className="bg-transparent py-1 px-2 w-full rounded-lg border-2 border-gray-400 text-base text-gray-700 placeholder:text-sm outline-none focus:border-gray-700"
                    type="text"
                    placeholder="Enter Disease Name"
                    value={inputs.disease}
                    onChange={(e) => setInputs({ ...inputs, disease: e.target.value })}
                  />
                </div>

                {uploadedImage ? (
                  <button
                    className="p-2 bg-green-700 rounded-full mt-3 w-full text-md font-semibold text-white hover:bg-green-800"
                    onClick={handleContribution}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      "Submit"
                    )}
                  </button>
                ) : (
                  <button type="submit" className="p-2 bg-green-700 rounded-full mt-3 w-full text-md font-semibold text-white hover:bg-green-800">
                    {uploading ? (
                      <Spinner />
                    ) : (
                      "Upload"
                    )}
                  </button>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImagePage