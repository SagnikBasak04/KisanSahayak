import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, ActivityIndicator } from "react-native";
import tw from "twrnc";
import useGetMyHistory from "../hooks/useGetMyHistory";

interface HistoryItem {
	id: string;
	crop: string;
	disease?: string;
	createdAt: string;
	url: string;
	recomm: string[];
	pesticides: string[];
}

const History = () => {
	const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
	const { loading, history } = useGetMyHistory();

	const fetchHistory = async () => {
		const data = await history();
		setHistoryData(data);
	}

	useEffect(() => {
		fetchHistory();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
			<View style={tw`flex-1 p-4`}>
				<Text style={tw`text-center text-gray-600 text-2xl font-bold mb-4`}>My History</Text>
				{loading ? (
					<ActivityIndicator size="large" color="#22c55e" />
				) : historyData.length > 0 ? (
					<ScrollView>
						{historyData.reverse().map((item, index) => (
							<View
								key={index}
								style={tw`mb-4 p-4 bg-gray-100 rounded-lg shadow-md`}
							>
								<Image
									source={{ uri: item.url }}
									style={tw`w-full h-48 rounded-lg`}
								/>
								<Text style={tw`text-xl text-gray-700 font-bold mt-2`}>
									Disease: {item.disease || "Unknown"}
								</Text>

								<Text style={tw`text-green-600 text-lg`}>
									Crop: <Text style={tw`text-gray-600 ml-4`}>{item.crop || "Not specified"}</Text>
								</Text>

								<Text style={tw`text-green-600 text-sm`}>
									Date: <Text style={tw`text-gray-600 ml-4`}>{item.createdAt || "Date unavailable"}</Text>
								</Text>

								{item.recomm && item.recomm.length > 0 ? (
									<Text style={tw`text-green-600 mt-2`}>
										Recommendations: {"\n"}
										{item.recomm.map((recomm, idx) => (
											idx === item.pesticides.length - 1 ? (
												<Text key={idx} style={tw`text-gray-600 ml-4`}>
													{"\u2022"} {recomm}
												</Text>
											) : (
												<Text key={idx} style={tw`text-gray-600 ml-4`}>
													{"\u2022"} {recomm} {"\n"}
												</Text>
											)
										))}
									</Text>
								) : (
									<Text style={tw`text-green-600 mt-2`}>
										Recommendations: {"\n"}
										<Text style={tw`text-gray-600 ml-4`}>🌞 Your crop is thriving! No recommendations needed. 🌱</Text>
									</Text>
								)}

								{item.pesticides && item.pesticides.length > 0 ? (
									<Text style={tw`text-green-600 mt-2`}>
										Pesticides: {"\n"}
										{item.pesticides.map((pesticide, idx) => (
											idx === item.pesticides.length - 1 ? (
												<Text key={idx} style={tw`text-gray-600 ml-4`}>
													{"\u2022"} {pesticide}
												</Text>
											) : (
												<Text key={idx} style={tw`text-gray-600 ml-4`}>
													{"\u2022"} {pesticide} {"\n"}
												</Text>
											)
										))}
									</Text>
								) : (
									<Text style={tw`text-green-600 mt-2`}>
										Pesticides: {"\n"}
										<Text style={tw`text-gray-600 ml-4`}>🥳 No pesticides required. Your crop is healthy! 🍎</Text>
									</Text>
								)}
							</View>
						))}
					</ScrollView>
				) : (
					<Text style={tw`text-center text-gray-600 mt-4`}>
						No history available.
					</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

export default History;
