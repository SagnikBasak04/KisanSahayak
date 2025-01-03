import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registering components to Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SoilChart = (weatherData) => {

    const data = {
        labels: ['N', 'K', 'P', 'pH'], // X-axis labels
        datasets: [
            {
                label: 'Mineral Content (% conc.) & pH level',
                data: [weatherData.data.N, weatherData.data.K, weatherData.data.P, weatherData.data.pH], // Y-axis values
                backgroundColor: 'rgba(90, 170, 60, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
            title: {
                display: true,
                text: 'Regional Soil Quality', // Title of the chart
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Y-axis starts from zero
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SoilChart;
