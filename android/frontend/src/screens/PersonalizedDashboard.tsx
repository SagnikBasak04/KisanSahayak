import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
import { Card, Text } from "@rneui/themed";
import { fetchWeatherInfo } from "../utils/getLocationAndWeatherData";
import RainfallChart from "../components/analytics/RainfallChart";
import SoilChart from "../components/analytics/SoilChart";
import useGetAnalysis from "../hooks/analysis";
import useGetPersonalizedAnalysis from "../hooks/useGetPersonalizedAnalysis";
import DiseaseChart from "../components/analytics/DiseaseChart";
import PesticideChart from "../components/analytics/PesticideChart";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

interface WeatherDataProps {
	District: string;
	ACTUAL: number;
	NORMAL: number;
	DEP: number;
	N: number;
	P: number;
	K: number;
	pH: number;
}

interface AnalysisDataProps {
	predictions: {
		crops: string[];
		diseases: string[];
	};
}

const PersonalDashboard: React.FC = () => {
	const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
	const [analysisData, setAnalysisData] = useState<AnalysisDataProps | null>(null);
	const { loading, analysis } = useGetAnalysis();
	const { loading: enloading, personalizedAnalysis } = useGetPersonalizedAnalysis();
	const [diseaseFrequency, setDiseaseFrequency] = useState<Record<string, number>>({});
	const [pesticideFrequency, setPesticideFrequency] = useState<Record<string, number>>({});
	const navigation = useNavigation();

	const getAnalysis = async () => {
		const res = await analysis();
		setAnalysisData(res);
	};

	const getPersonalizedAnalysis = async () => {
		const data = await personalizedAnalysis();
		setDiseaseFrequency(data?.diseaseFrequency);
		setPesticideFrequency(data?.pesticideFrequency);
	};

	useEffect(() => {
		const getWeatherData = async () => {
			try {
				const data = await fetchWeatherInfo();
				setWeatherData(data);
			} catch (error) {
				console.log("Failed to fetch weather data:", error);
			}
		};

		getWeatherData();
		getAnalysis();
		getPersonalizedAnalysis();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<View style={tw`flex-col gap-1 items-center justify-center mt-3`}>
				<View style={tw`flex-row gap-1`}>
					<Text style={tw`text-lg text-gray-600`}>
						Region:
					</Text>
					<Text style={tw`text-lg text-gray-600`}>
						{weatherData?.District}
					</Text>
				</View>
				<View style={tw`w-[90%] mt-1 h-[1.2px] bg-gray-400`} />
			</View>

			{/* Regional Analysis */}
			<Text style={styles.heading}>Regional Environmental Conditions Analysis</Text>
			{weatherData ? (
				<Card>
					<Card.Title style={tw`text-xl`}>Weather Analytics</Card.Title>
					<Card.Divider />
					<RainfallChart data={weatherData} />
					<SoilChart data={weatherData} />
					{analysisData && (
						<>
							<Text style={styles.subHeading}>Most Suitable Crops:</Text>
							{analysisData?.predictions?.crops?.map((crop: string, idx: number) => (
								<Text key={idx} style={styles.listItem}>
									• {crop}
								</Text>
							))}
							<Text style={styles.subHeading}>Common Diseases:</Text>
							{analysisData?.predictions?.diseases?.map((disease: string, idx: number) => (
								<Text key={idx} style={styles.listItem}>
									• {disease}
								</Text>
							))}
						</>
					)}
				</Card>
			) : (
				loading && <ActivityIndicator size="large" color="#0000ff" />
			)}

			{/* Personalized Analysis */}
			<Text style={styles.heading}>Personalized Analysis</Text>
			{enloading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<Card>
					<Card.Title style={tw`text-xl`}>Crop Health Analysis</Card.Title>
					<Card.Divider />
					{Object.keys(diseaseFrequency)?.length > 0 && Object.keys(pesticideFrequency)?.length > 0 ? (
						<>
							<DiseaseChart diseaseFrequency={diseaseFrequency} />
							<PesticideChart pesticideFrequency={pesticideFrequency} />
						</>
					) : (
						<Text>No data available.</Text>
					)}
				</Card>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	backButton: { alignSelf: "flex-start", margin: 10 },
	backText: { color: "gray", marginLeft: 5 },
	heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
	subHeading: { fontSize: 18, fontWeight: "600", marginTop: 10 },
	listItem: { fontSize: 16, marginVertical: 4 },
});

export default PersonalDashboard;