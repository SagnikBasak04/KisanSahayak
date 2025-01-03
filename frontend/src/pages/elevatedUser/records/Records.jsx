import { useEffect, useState } from "react";
import Navbar from "../../../components/navbars/Navbar-actions";
import useGetRecords from "../../../hooks/useGetRecords";
import RecordCard from "../../../components/RecordCard";
import Spinner2 from "../../../components/Spinner2";

const Records = () => {
	const { loading, records } = useGetRecords();
	const [recordsData, setRecordsData] = useState([]);

	const getRecords = async () => {
		try {
			const data = await records();
			setRecordsData(data);
		} catch (error) {
			console.error("Failed to fetch history data:", error);
		}
	};

	useEffect(() => {
		getRecords();
	}, []);

	return (
		<div>
			<Navbar />

			<div className="flex flex-col gap-3 items-center justify-center w-full">
				<h1 className="mt-3 text-[50px] font-bold text-gray-700">All Records</h1>

				<div className="flex justify-center">
					{loading ? (
						<Spinner2 />
					) : (
						<div className="w-full">
							{recordsData?.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
									{[...recordsData].reverse().map((record, _idx) => (
										<RecordCard key={_idx} record={record} />
									))}
								</div>
							) : (
								<span className="text-gray-500">No History Available</span>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Records;
