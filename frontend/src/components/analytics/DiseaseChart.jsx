/* eslint-disable react/prop-types */
import FrequencyChart from './FrequencyChart';

const DiseaseChart = ({ diseaseFrequency }) => {
    const labels = Object.keys(diseaseFrequency);
    const data = Object.values(diseaseFrequency);

    return (
        <div>
            <FrequencyChart labels={labels} data={data} title="Disease Frequency" head="Most Predicted Diseases" backgroundColour="rgba(75, 75, 192, 0.2)" />
        </div>
    );
};

export default DiseaseChart;
