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

const RainfallChart = ({ data }: { data: WeatherDataProps }) => {
    const screenWidth = Dimensions.get("window").width;
    const rainfallData = data;

    const chartData = {
        labels: ['Actual Rainfall', 'Normal Rainfall', '% DEP'], // X-axis labels
        datasets: [
            {
                label: 'Rainfall (mm)', // lol
                data: [rainfallData.ACTUAL, rainfallData.NORMAL, rainfallData.DEP], // Y-axis values
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 1,
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Rainfall per Month</Text>
            <BarChart
                data={chartData}
                width={screenWidth - 32} // Chart width adjusted to fit screen
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 1,
                    barPercentage: 0.6,
                    fillShadowGradient: "rgba(75, 192, 192, 0.8)",
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
        marginBottom: 10,
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

export default RainfallChart;
