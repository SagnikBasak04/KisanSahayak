import React from "react";
import { View } from "react-native";
import FrequencyChart from "./FrequencyChart";

const DiseaseChart = ({ diseaseFrequency }) => {
    const labels = Object.keys(diseaseFrequency);
    const data = Object.values(diseaseFrequency);

    return (
        <View>
            <FrequencyChart
                labels={labels}
                data={data}
                title="Disease Frequency"
                head="Most Predicted Diseases"
                backgroundColour="rgba(75, 75, 192, 0.8)"
            />
        </View>
    );
};

export default DiseaseChart;
