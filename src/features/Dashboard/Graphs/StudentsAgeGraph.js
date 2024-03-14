
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import {DashboardService} from '../../../services/dashboard.service'
import { graphSkeleton } from '../../../utils';

export default function StudentsAgeGraph() {
    const [studentsAgeData, setStudentsAgeData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [shouldRefetch, setShouldRefetch] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function setStudentsAgeGraph(ageData) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            let datasets = [
                {
                    type: 'bar',
                    label: 'Students',
                    width: 10,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    data: []
                },
            ]
            if (ageData.lowestAge && ageData.highestAge) {
                datasets.push({
                    type: 'bar',
                    label: `Ages ${ageData.lowestAge} - ${ageData.highestAge}`,
                    width: 10,
                    data: []
                })
            }
            const labels = Object.keys(ageData.studentCountByAge)
            labels.forEach(label => {
                // console.log(+label, typeof label, ageData.highestAge, ageData.lowestAge, +label === ageData.highestAge)
                // if (+label === ageData.highestAge) {
                //     datasets[0].backgroundColor = documentStyle.getPropertyValue('--red-500')
                // }
                // if (+label === ageData.lowestAge) {
                //     delete datasets[0].backgroundColor
                // }
                datasets[0].data.push(ageData.studentCountByAge[label])
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
    
            setStudentsAgeData(data);
            setChartOptions(options);
            setIsLoading(false)
        }
        async function getStudentsAgeStats() {
            try {
                setIsLoading(true)
                const {data: ageData} = await DashboardService.getStudentsAgeYTD()
                setShouldRefetch(false)
                setStudentsAgeGraph(ageData)
            } catch (e) {
                setIsLoading(false)
            }
        }
        if (shouldRefetch) {
            getStudentsAgeStats()
        }
    }, []);

    return (
        <>
            {isLoading ? graphSkeleton :
                        <Chart type="bar" data={studentsAgeData} options={chartOptions} />}
        </>
    )

}