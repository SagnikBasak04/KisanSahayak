import Navbar from "../../../components/navbars/Navbar-actions";
import { FaCheck } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { useEnrollmentContext } from "../../../context/EnrollmentContext";
import { Link } from "react-router-dom";
import useCreateMetadata from "../../../hooks/useCreateMetadata";
import Spinner from "../../../components/Spinner";
import { useElevatedUserContext } from "../../../context/ElevatedUserContext";

const Contribute = () => {
	const { enrolledUser } = useEnrollmentContext();
	const { elevatedUser } = useElevatedUserContext();
	const { loading, createMetadata } = useCreateMetadata();

	console.log(enrolledUser);

	const accuracyCalc = () => {
		if (enrolledUser?.correct === 0 && enrolledUser?.incorrect === 0) return 0.0;
		const accuracy = (enrolledUser?.correct / (enrolledUser?.correct + enrolledUser?.incorrect)) * 100.0;
		return accuracy.toFixed(1);
	}

	const handleEnrolment = async () => {
		await createMetadata();
	}

	console.log(elevatedUser);

	return (
		<div>
			<Navbar />

			<div className="flex flex-col gap-3 items-center justify-center w-full">
				<h1 className="mt-3 text-[45px] font-bold text-gray-700 text-center">Contribute to your and our Cause!</h1>
			</div>

			{enrolledUser ? (
				<>
					<div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 p-4 mt-4">
						<div className="flex gap-5 items-center justify-center bg-green-400 rounded-lg px-6 py-3">
							<FaCheck className="text-4xl text-green-800" />
							<h2 className="text-4xl text-green-800 font-semibold font-mono">{enrolledUser?.correct}</h2>
						</div>

						<div className="flex gap-5 items-center justify-center bg-red-400 rounded-lg px-6 py-3">
							<RiCloseLargeFill className="text-4xl text-red-800" />
							<h2 className="text-4xl text-red-800 font-semibold font-mono">{enrolledUser?.incorrect}</h2>
						</div>

						<div className="flex gap-5 items-center justify-center bg-gray-300 rounded-lg px-6 py-3">
							<VscGraph className="text-4xl text-gray-700" />
							<h2 className="text-4xl text-gray-700 font-semibold font-mono">{accuracyCalc()}</h2>
						</div>

						<div className="flex gap-5 items-center justify-center bg-yellow-300 rounded-lg px-6 py-3">
							<MdEnergySavingsLeaf className="text-4xl text-green-700" />
							<h2 className="text-4xl text-green-800 font-semibold font-mono">{enrolledUser?.greenPoints.toFixed(2)}</h2>
						</div>
					</div>

					<div className="w-full flex items-center justify-center">
						<div className={`grid grid-cols-1 sm:grid-cols-2 ${elevatedUser ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-8 mt-10 p-8 lg:px-24`}>
							<div className="flex flex-col items-center justify-center gap-6 bg-green-300 rounded-lg p-3 backdrop-blur-xl backdrop-filter shadow-xl hover:scale-105">
								<img src="/game.png" alt="game" className="w-[300px]" />
								<Link to="/elevated-user/play" className="w-[90%] flex flex-col items-center justify-center text-center bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-lg">
									<p>
										Play an interactive game<br />
										Earn Green Points! <MdEnergySavingsLeaf className="inline-block text-green-700 text-2xl mb-1" />
									</p>
								</Link>
							</div>

							<div className="flex flex-col items-center justify-center gap-6 bg-green-300 rounded-lg p-3 backdrop-blur-xl backdrop-filter shadow-xl hover:scale-105">
								<img src="/images.png" alt="images" className="md:w-[256px] sm:w-[210px]" />
								<Link to="/elevated-user/images" className="w-full px-2 flex flex-col items-center justify-center text-center bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-lg">
									<p>
										Contribute with images of your own<br />
										Earn Green Points! <MdEnergySavingsLeaf className="inline-block text-green-700 text-2xl mb-1" />
									</p>
								</Link>
							</div>

							{elevatedUser && (
								<div className="flex flex-col items-center justify-center gap-6 bg-green-300 rounded-lg p-3 backdrop-blur-xl backdrop-filter shadow-xl hover:scale-105">
									<img src="/update.png" alt="update" />
									<Link to="/elevated-user/records" className="w-full px-2 flex flex-col items-center justify-center text-center bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-lg">
										<p>
											Help us Improve with your valuable contribution! <MdEnergySavingsLeaf className="inline-block text-green-700 text-2xl mb-1" />
										</p>
									</Link>
								</div>
							)}
						</div>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center w-full mt-10 mb-10">
					<div className="flex flex-col gap-2 w-fit p-4 bg-gray-200 rounded-xl backdrop-blur-xl backdrop-filter shadow-xl hover:scale-105">
						<div className="w-full mx-2 flex items-center justify-between">
							<img src="/GreenGuardians.png" alt="team_logo" className="w-12" />
							<MdEnergySavingsLeaf className="text-3xl mr-3 text-green-700" />
						</div>
						<img src="/journey.png" alt="journey" className="object-cover object-center" />
						<button
							className="bg-green-600 hover:bg-green-700 text-white font-medium text-lg p-2 rounded-lg -mt-3"
							onClick={handleEnrolment}
							disabled={loading}
						>
							{loading ? <Spinner /> : <span>Embark on the amazing Journey</span>}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Contribute