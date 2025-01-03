import React from "react";
import { View } from "react-native";
import FrequencyChart from "./FrequencyChart";

const PesticideChart = ({ pesticideFrequency }) => {
    const labels = Object.keys(pesticideFrequency);
    const data = Object.values(pesticideFrequency);

    return (
        <View>
            <FrequencyChart
                labels={labels}
                data={data}
                title="Pesticide Frequency"
                head="Most Suggested Pesticides for You"
                backgroundColour="rgba(192, 75, 75, 0.8)"
            />
        </View>
    );
};

export default PesticideChart;
