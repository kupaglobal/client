
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function CohortCostsGraph({ cohortCostsData }) {
    const [chartData, setCharData] = useState(null)
    const [chartOptions, setChartOptions] = useState({});
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function setStudentsGenderGraph(cohortsData) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            // const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            // const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            let datasets = [
                {
                    label: 'Cost',
                    backgroundColor: documentStyle.getPropertyValue('--primary-600'),
                    data: cohortsData.map(cohortCost => cohortCost.costOfFundedStudents.totalCost),
                    borderWidth: 1
                }
            ]
            const labels = cohortsData.map(cohortCost => cohortCost.name)

            const data = {
                labels,
                datasets,
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 0.7,
                plugins: {
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        barPercentage: 0.2, // Adjust bar width as needed
                        categoryPercentage: 0.1, // Adjust bar width as needed,
                    },
                    y: {
                        beginAtZero: true,
                        
                    }
                }
            };
    
            setCharData(data);
            setChartOptions(options);
    
        }
        setStudentsGenderGraph(cohortCostsData)
    }, [cohortCostsData]);

    return (
        <>
        <Chart type="bar" data={chartData} options={chartOptions} style={{minWidth: "75rem"}} />
        
        </>
        
    )

}