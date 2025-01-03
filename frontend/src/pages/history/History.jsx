import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbars/Navbar-actions";
import useGetMyHistory from "../../hooks/useGetMyHistory";
import HistoryCard from "../../components/HistoryCard";
import gsap from "gsap";
import Spinner2 from "../../components/Spinner2";

const History = () => {
	const { loading, history } = useGetMyHistory();
	const [historyData, setHistoryData] = useState([]);
	const historyPanel = useRef(null);

	const getHistory = async () => {
		try {
			const data = await history();
			setHistoryData(data);
		} catch (error) {
			console.error("Failed to fetch history data:", error);
		}
	};

	useEffect(() => {
		getHistory();
	}, []);

	useEffect(() => {
		if (historyData) {
			gsap.set(historyPanel.current, { 
				y: 50, 
				opacity: 0 
			});

			gsap.to(historyPanel.current, {
				y: 0,
				opacity: 1,
				duration: 1.5,
				ease: "power2.out",
			});
		}
	}, [historyData]);

	return (
		<div>
			<Navbar />

			<div className="flex flex-col gap-3 items-center justify-center w-full">
				<h1 className="mt-3 text-[50px] font-bold text-gray-700">My History</h1>

				<div className="flex justify-center">
					{loading ? (
						<Spinner2 />
					) : (
						<div ref={historyPanel} className="w-full">
							{historyData?.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
									{[...historyData].reverse().map((history, _idx) => (
										<HistoryCard key={_idx} history={history} />
									))}
								</div>
							) : (
								<span className="text-lg text-gray-500">No History Available</span>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default History;
