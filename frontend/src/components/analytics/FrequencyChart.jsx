import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const FrequencyChart = ({ labels, data, title, head, backgroundColour }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            // Clearing any existing chart instance if it exists (to prevent re-render issues)
            chartRef.current.destroy();
        }

        const ctx = document.getElementById(title).getContext('2d');

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    backgroundColor: backgroundColour,
                    borderColor: 'rgba(192, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: head,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Cleanup on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [labels, data, title, head, backgroundColour]);

    return <canvas id={title} />;
};

export default FrequencyChart;
