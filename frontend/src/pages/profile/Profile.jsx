import { useState, useEffect } from "react";
import Navbar from "../../components/navbars/Navbar-actions";
import { useAuthContext } from "../../context/AuthContext";
import { fetchIPInfo } from "../../utils/getLocationAndWeatherData";
import { GiWheat, GiBowlOfRice, GiSugarCane, GiCorn, GiPotato } from "react-icons/gi";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import Spinner from "../../components/Spinner";

const Profile = () => {
	const { authUser } = useAuthContext();
	const [myDistrict, setMyDistrict] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { loading, deleteAcc } = useDeleteAccount();

	const getMyDistrict = async () => {
		const district = await fetchIPInfo();
		if (district?.city) {
			setMyDistrict(district.city);
		} else {
			setMyDistrict("No Relevant district found");
		}
	};

	const getProfilePic = () => {
		const ProfilePic =
			authUser.gender === "M"
				? `https://avatar.iran.liara.run/public/boy?username=${authUser.name}`
				: `https://avatar.iran.liara.run/public/girl?username=${authUser.name}`;

		setProfilePic(ProfilePic);
	}

	const handleDelete = async (e) => {
		e.preventDefault();
		await deleteAcc(password);
		setIsModalOpen(false);
		setPassword("");
	};

	const iconLabels = [
		{ icon: <GiWheat />, crop: "Wheat" },
		{ icon: <GiBowlOfRice />, crop: "Rice" },
		{ icon: <GiSugarCane />, crop: "SugarCane" },
		{ icon: <GiCorn />, crop: "Corn" },
		{ icon: <GiPotato />, crop: "Potato" }
	];

	useEffect(() => {
		getMyDistrict();
		getProfilePic();
	}, []);


	return (
		<div>
			<Navbar />
			<h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-4">My Profile</h1>

			{profilePic ? (
				<div className="flex items-center justify-center mt-10">
					<div className="flex flex-col gap-2 items-center justify-center bg-gray-200 p-6 rounded-lg shadow-xl backdrop-blur-lg backdrop-filter bg-gradient-to-br from-gray-300 to-gray-200 mb-10">
						<img src={profilePic} alt={authUser.name} className="size-[300px] rounded-lg" />

						<div className="flex flex-col items-center justify-center">
							<span className="font-bold text-xl text-gray-700">{authUser.name}</span>
							<p>
								<b className="text-gray-800">Mobile no.: </b>
								{authUser.phoneno}
							</p>
							<p>
								<b className="text-gray-800">Gender: </b>
								{authUser.gender === "M" ? "Male" : "Female"}
							</p>
							<p>
								<b className="text-gray-800">DOB: </b>
								{authUser.dob}
							</p>
							<p>
								<b className="text-gray-800">Crops you grow: </b>
								<ul className="ml-5">
									{authUser.crops.map((crop, _idx) => {
										const matchingIcon = iconLabels.find((item) => item.crop.toLowerCase() === crop.toLowerCase());
										return (
											<li key={_idx} className="flex items-center gap-2">
												{matchingIcon ? matchingIcon.icon : null}
												<span>{crop}</span>
											</li>
										);
									})}
								</ul>
							</p>
							<p>
								<b className="text-gray-800">Location: </b>
								{myDistrict}
							</p>
						</div>

						<button
							className="bg-gradient-to-br from-red-700 to-red-500 p-2 w-full overflow-hidden rounded-lg font-semibold text-gray-100 hover:scale-105"
							onClick={() => setIsModalOpen(true)}
						>
							Delete Account
						</button>
					</div>
				</div>
			) : (
				<Spinner />
			)}

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4">Delete Account</h2>
						<p className="mb-4 text-gray-700">Enter your password to confirm account deletion:</p>
						<input
							type="text"
							className="w-full p-2 border border-gray-300 rounded-lg mb-4"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="flex justify-end gap-4">
							<button
								className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
								onClick={() => {
									setIsModalOpen(false);
									setPassword("");
								}}
							>
								Cancel
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
								onClick={handleDelete}
								disabled={loading}
							>
								{loading ? <Spinner /> : "Confirm"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
