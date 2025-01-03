import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Text } from "@rneui/themed";

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

const SoilChart = ({ data }: { data: WeatherDataProps }) => {
  const screenWidth = Dimensions.get("window").width;
  const rainfallData = data;

  const chartData = {
    labels: ['N', 'K', 'P', 'pH'], // X-axis labels
    datasets: [
      {
        label: 'Mineral Content (% conc.) & pH level',
        data: [data.N, data.K, data.P, data.pH], // Y-axis values
        backgroundColor: 'rgba(90, 170, 60, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Regional Soil Quality</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 32} // Chart width adjusted to fit screen
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          barPercentage: 0.6,
          fillShadowGradient: "rgba(90, 170, 60, 0.8)",
          fillShadowGradientOpacity: 1,
          color: () => "rgba(75, 192, 192, 1)",
          labelColor: () => "rgba(0, 0, 0, 0.8)",
        }}
        yAxisLabel=" " // Empty label to match previous design
        yAxisSuffix="" // Empty suffix
        verticalLabelRotation={30}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 0,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "medium",
    marginBottom: 8,
    textAlign: "center",
  },
  chart: {
    borderRadius: 8,
  },
});

export default SoilChart;