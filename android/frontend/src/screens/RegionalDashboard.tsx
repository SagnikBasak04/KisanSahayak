import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getRegionalWeather } from "../utils/getLocationAndWeatherData";
import RainfallChart from "../components/analytics/RainfallChart";
import SoilChart from "../components/analytics/SoilChart";
import useGetRegionalAnalysis from "../hooks/useGetRegionalAnalysis";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../types";

type RegionalDashboardRouteProp = RouteProp<RootStackParamList, 'RegionalDashboard'>;

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

const RegionalDashboard = ({ route }: { route: RegionalDashboardRouteProp }) => {
	const navigation = useNavigation();
	const { district } = route.params;
	const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
	const [analysisData, setAnalysisData] = useState<AnalysisDataProps | null>(null);
	const { loading, regionalAnalysis } = useGetRegionalAnalysis();

	const getRegionalAnalysisData = async () => {
		try {
			const res = await regionalAnalysis(district);
			setAnalysisData(res);
		} catch (error) {
			console.error("Failed to fetch regional analysis:", error);
		}
	};

	const getWeatherData = () => {
		try {
			const data = getRegionalWeather(district);
			if (data) {
				setWeatherData(data);
			}
		} catch (error) {
			console.error("Failed to fetch weather data:", error);
		}
	};

	useEffect(() => {
		getWeatherData();
		getRegionalAnalysisData();
	}, [district]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backButton}
			>
				<Ionicons name="arrow-back" size={24} color="gray" />
				<Text style={styles.backText}>Back</Text>
			</TouchableOpacity>

			<Text style={styles.header}>Environmental Conditions Analysis of {district}</Text>

			{weatherData ? (
				<View style={styles.chartContainer}>
					<View style={styles.chartWrapper}>
						<RainfallChart data={weatherData} />
					</View>

					<View style={styles.chartWrapper}>
						<SoilChart data={weatherData} />
					</View>

					{analysisData && (
						<View style={styles.analysisContainer}>
							<View style={styles.analysisBox}>
								<Text style={styles.subHeader}>Most Suitable Crops for this Region</Text>
								<View style={styles.list}>
									{analysisData?.predictions?.crops?.map((crop, idx) => (
										<Text key={idx} style={styles.listItem}>
											{crop}
										</Text>
									))}
								</View>
							</View>

							<View style={styles.analysisBox}>
								<Text style={styles.subHeader}>Diseases the crops here are most prone to</Text>
								<View style={styles.list}>
									{analysisData?.predictions?.diseases?.map((disease, idx) => (
										<Text key={idx} style={styles.listItem}>
											{disease}
										</Text>
									))}
								</View>
							</View>
						</View>
					)}
				</View>
			) : (
				loading && <ActivityIndicator size="large" color="#0000ff" />
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	backText: {
		fontSize: 16,
		color: "gray",
		marginLeft: 8,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
		color: "#333",
	},
	chartContainer: {
		flex: 1,
		justifyContent: "center",
	},
	chartWrapper: {
		marginBottom: 20,
	},
	analysisContainer: {
		marginTop: 30,
	},
	analysisBox: {
		marginBottom: 16,
	},
	subHeader: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
		color: "#333",
	},
	list: {
		paddingLeft: 16,
	},
	listItem: {
		fontSize: 16,
		color: "#555",
		marginBottom: 6,
	},
});

export default RegionalDashboard;
