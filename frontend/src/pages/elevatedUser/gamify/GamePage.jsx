import { useState, useEffect } from "react";
import { gsap } from "gsap";
import Navbar from "../../../components/navbars/Navbar-actions";
import useGetImagesForGame from "../../../hooks/useGetImagesForGame";
import Spinner from "../../../components/Spinner";
import { useEnrollmentContext } from "../../../context/EnrollmentContext";
import { FaCheck } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import useUpdateMetadata from "../../../hooks/useUpdateStats";

const GamePage = () => {
  const [images, setImages] = useState([]);
  const { loading, getImages } = useGetImagesForGame();
  const { loading: enLoading, update } = useUpdateMetadata();
  const [attempt, setAttempt] = useState(0);
  const [index, setIndex] = useState(0);
  const [crop, setCrop] = useState("");
  const [disease, setDisease] = useState("");
  const { enrolledUser, setEnrolledUser } = useEnrollmentContext();
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const navigate = useNavigate();

  const loadGame = async () => {
    setAttempt(attempt + 1);
    setIndex(0);

    const data = await getImages();
    if (data) {
      setImages(data);
    }
  };

  useEffect(() => {
    // GSAP animation for the glass shine effect
    gsap.to(".shine", {
      x: "200%",
      y: "200%",
      duration: 3,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  const handleConfirm = (e) => {
    e.preventDefault();
    setAnswered(true);

    const isCorrect =
      crop.replace(/[_\s]/g, "").toLowerCase() === images[index].crop.replace(/[_\s]/g, "").toLowerCase() &&
      disease.replace(/[_\s]/g, "").toLowerCase() === images[index].disease.replace(/[_\s]/g, "").toLowerCase();

    if (isCorrect) setCorrect(true);
    const updatedUser = {
      ...enrolledUser,
      correct: isCorrect ? enrolledUser.correct + 1 : enrolledUser.correct,
      incorrect: isCorrect ? enrolledUser.incorrect : enrolledUser.incorrect + 1,
      greenPoints: isCorrect ? enrolledUser.greenPoints + 0.01 : enrolledUser.greenPoints,
    };
    
    localStorage.setItem("KS-enrolledUser", JSON.stringify(updatedUser));
    setEnrolledUser(updatedUser);
  }

  const handleNext = async () => {
    setIndex(index + 1);

    if (index < 9) {
      setAnswered(false);
      setCorrect(false);
      setCrop("");
      setDisease("");
    } else {
      setImages([]);
      await update();
    }
  }

  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <div className="flex w-full px-6 items-start -mt-4">
          <Link to="/elevated-user/contribute" className="flex items-center gap-1 text-lg text-gray-500  hover:text-gray-600"><IoMdArrowRoundBack /> Back</Link>
        </div>

        <h1 className="-mt-3 text-[45px] font-bold text-gray-700 text-center">
          Take the Challenge...Show your Knowledge!
        </h1>
      </div>

      <div className="w-full flex items-center justify-center">
        <div
          className="relative flex flex-col items-center justify-center gap-3 p-6 w-fit mt-8 rounded-xl shadow-2xl bg-black/20 backdrop-blur-md backdrop-filter border border-white/20 hover:scale-105 cursor-pointer mb-10"
        >
          {loading ? (
            <img src="/gifend.gif" alt="loading" className="rounded-lg w-[400px] lg:w-[460px] sm:w-[370px]" />
          ) : (
            <>
              {images.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h1 className="text-center text-xl font-semibold text-gray-700">Predict the Crop the Disease</h1>
                  <div className="h-[0.9px] bg-gray-400 -mt-1 rounded-full" />

                  <img
                    src={images[index].image_url}
                    alt={index}
                    className="w-[360px] lg:w-[400px] sm:w-[300px] z-20 rounded-lg"
                  />

                  {answered ? (
                    <div>
                      {correct ? (
                        <h1 className="flex items-center justify-center gap-2 text-xl font-bold text-green-700">Correct <FaCheck /></h1>
                      ) : (
                        <h1 className="flex items-center justify-center gap-2 text-xl font-bold text-red-700">Incorrect <RiCloseLargeFill /></h1>
                      )}

                      <div>
                        <span className="text-base font-medium text-gray-700">Crop: </span>
                        <span className="text-base font-semibold text-gray-800">{images[index].crop}</span>
                      </div>
                      <div>
                        <span className="text-base font-medium text-gray-700">Disease: </span>
                        <span className="text-base font-semibold text-gray-800">{images[index].disease}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="p-1 bg-green-700 rounded-full mt-3 w-1/2 text-md font-semibold text-white hover:bg-green-800"
                          onClick={handleNext}
                        >
                          Next
                        </button>
                        <button
                          className="p-1 bg-gray-600 rounded-full mt-3 w-1/2 text-md font-semibold text-white hover:bg-gray-700"
                          onClick={async () => {
                            await update();
                            navigate("/elevated-user/contribute");
                          }}
                        >
                          Finish
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form className="flex flex-col gap-3" onSubmit={handleConfirm}>
                      <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold text-gray-800">Crop</label>
                        <input
                          className="bg-transparent py-1 px-2 w-full rounded-lg border-2 border-gray-400 text-base text-gray-700 placeholder:text-sm outline-none focus:border-gray-700"
                          type="text"
                          placeholder="Enter Crop Name"
                          required
                          value={crop}
                          onChange={(e) => setCrop(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold text-gray-800">Disease</label>
                        <input
                          className="bg-transparent py-1 px-2 w-full rounded-lg border-2 border-gray-400 text-base text-gray-700 placeholder:text-sm outline-none focus:border-gray-700"
                          type="text"
                          placeholder="Enter Disease Name"
                          required
                          value={disease}
                          onChange={(e) => setDisease(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="p-1 bg-green-700 rounded-full mt-3 w-full text-md font-semibold text-white hover:bg-green-800">Confirm</button>
                    </form>
                  )}
                </div>
              ) : (
                <div
                  onClick={loadGame}
                  aria-disabled
                >
                  <div className="shine absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none" />
                  <img
                    src="/startGame.gif"
                    alt="start game"
                    className="w-[400px] lg:w-[460px] sm:w-[370px] z-20 rounded-lg"
                  />

                  <div className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 backdrop-blur-md backdrop-filter border-2 border-green-700 rounded-lg overflow-hidden py-1 px-2">
                    <h1 className="text-xl font-semibold text-white">
                      {loading ?
                        <Spinner /> :
                        <span>
                          {attempt ? "Continue" : "Play"}
                        </span>}
                    </h1>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;