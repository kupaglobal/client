
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function AssessmentGraph({ labels, results = [], colors = ['blue', 'yellow', 'green', 'purple'] }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels,
            datasets: [
                {
                    data: results,
                    // backgroundColor: colors.map(color => documentStyle.getPropertyValue(`--${color}-500`)),
                    // // [
                    // //     documentStyle.getPropertyValue('--blue-500'), 
                    // //     documentStyle.getPropertyValue('--yellow-500'), 
                    // //     documentStyle.getPropertyValue('--green-500')
                    // // ],
                    // hoverBackgroundColor: colors.map(color => documentStyle.getPropertyValue(`--${color}-400`))
                    // [
                    //     documentStyle.getPropertyValue('--blue-400'), 
                    //     documentStyle.getPropertyValue('--yellow-400'), 
                    //     documentStyle.getPropertyValue('--green-400')
                    // ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [labels, results]);

    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-15rem" />
        </div>
    )
}
        