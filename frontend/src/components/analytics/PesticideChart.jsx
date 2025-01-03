/* eslint-disable react/prop-types */
import FrequencyChart from "./FrequencyChart";

const PesticideChart = ({ pesticideFrequency }) => {
    const labels = Object.keys(pesticideFrequency);
    const data = Object.values(pesticideFrequency);

    return (
        <div>
            <FrequencyChart labels={labels} data={data} title="Pesticide Frequency" head="Most suggested Pesticides for You" backgroundColour="rgba(192, 75, 75, 0.2)" />
        </div>
    );
};

export default PesticideChart;
