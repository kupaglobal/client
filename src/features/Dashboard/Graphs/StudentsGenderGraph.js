
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import {DashboardService} from '../../../services/dashboard.service'
import { graphSkeleton } from '../../../utils';

export default function StudentsGenderGraph() {
    const [studentsGenderData, setStudentsGenderData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [shouldRefetch, setShouldRefetch] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function setStudentsGenderGraph(genderData) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            let datasets = [
                {
                    type: 'bar',
                    label: 'Male',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: []
                },
                {
                    type: 'bar',
                    label: 'Female',
                    backgroundColor: documentStyle.getPropertyValue('--purple-300'),
                    data: []
                }
            ]
            const labels = Object.keys(genderData.data)
            labels.forEach(label => {

                // update female
                datasets[0].data.push(genderData.data[label].FEMALE)
                // update male
                datasets[1].data.push(genderData.data[label].MALE)
            })

            
            const data = {
                labels,
                datasets,
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
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
                        stacked: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
    
            setStudentsGenderData(data);
            setChartOptions(options);
    
        }
        async function getStudentsGenderStats() {
            try {
                const {data: genderData} = await DashboardService.getStudentsGenderYTD()
            
                setShouldRefetch(false)
                setStudentsGenderGraph(genderData)
                setIsLoading(false)
            } catch (e) {
                setIsLoading(false)
            }
            

        }
        if (shouldRefetch) {
            getStudentsGenderStats()
        }
    }, [shouldRefetch]);

    return (
        <>
        {isLoading ? graphSkeleton :
        <Chart type="bar" data={studentsGenderData} options={chartOptions} />}
        </>
        
    )

}