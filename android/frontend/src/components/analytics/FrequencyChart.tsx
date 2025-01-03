import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Text } from "@rneui/themed";

const FrequencyChart = ({ labels, data, title, head, backgroundColour }) => {
    const screenWidth = Dimensions.get("window").width;

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>{head}</Text>
            <BarChart
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                        },
                    ],
                }}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    barPercentage: 0.5,
                    fillShadowGradient: backgroundColour,
                    fillShadowGradientOpacity: 0.8,
                    color: () => "rgba(0, 0, 0, 0.6)",
                    labelColor: () => "rgba(0, 0, 0, 0.8)",
                }}
                verticalLabelRotation={30}
                yAxisLabel="" 
                yAxisSuffix=""
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

export default FrequencyChart;
