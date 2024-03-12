
//import React, { useState, useEffect } from 'react';
// import { Chart } from 'primereact/chart';
// import { DashboardService } from '../../services/dashboard.service';

export default function StackedBarDemo() {
    // const [studentsGenderData, setStudentsGenderData] = useState({});
    // const [chartData, setChartData] = useState({});
    // const [chartOptions, setChartOptions] = useState({});
    // const [shouldRefetch, setShouldRefetch] = useState(true)

    // useEffect(() => {
    //     function setStudentsGenderGraph(genderData) {
    //         const documentStyle = getComputedStyle(document.documentElement);
    //         const textColor = documentStyle.getPropertyValue('--text-color');
    //         const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    //         const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    //         let datasets = [
    //             {
    //                 type: 'bar',
    //                 label: 'Female',
    //                 backgroundColor: documentStyle.getPropertyValue('--purple-500'),
    //                 data: []
    //             },
    //             {
    //                 type: 'bar',
    //                 label: 'Male',
    //                 backgroundColor: documentStyle.getPropertyValue('--blue-500'),
    //                 data: []
    //             }
    //         ]
    //         const labels = Object.keys(genderData.data)
    //         labels.forEach(label => {

    //             // update female
    //             datasets[0].data.push(genderData.data[label].FEMALE)
    //             // update male
    //             datasets[1].data.push(genderData.data[label].MALE)
    //         })

            
    //         const data = {
    //             labels,
    //             datasets,
    //             // [
    //             //     {
    //             //         type: 'bar',
    //             //         label: 'Female',
    //             //         backgroundColor: documentStyle.getPropertyValue('--purple-500'),
    //             //         data: [genderData.data]
    //             //     },
    //             //     {
    //             //         type: 'bar',
    //             //         label: 'Dataset 2',
    //             //         backgroundColor: documentStyle.getPropertyValue('--green-500'),
    //             //         data: [21, 84]
    //             //     }
    //             // ]
    //         };
    //         const options = {
    //             maintainAspectRatio: false,
    //             aspectRatio: 0.8,
    //             plugins: {
    //                 tooltips: {
    //                     mode: 'index',
    //                     intersect: false
    //                 },
    //                 legend: {
    //                     labels: {
    //                         color: textColor
    //                     }
    //                 }
    //             },
    //             scales: {
    //                 x: {
    //                     stacked: true,
    //                     ticks: {
    //                         color: textColorSecondary
    //                     },
    //                     grid: {
    //                         color: surfaceBorder
    //                     }
    //                 },
    //                 y: {
    //                     stacked: true,
    //                     ticks: {
    //                         color: textColorSecondary
    //                     },
    //                     grid: {
    //                         color: surfaceBorder
    //                     }
    //                 }
    //             }
    //         };
    
    //         setStudentsGenderData(data);
    //         setChartOptions(options);
    
    //     }
    //     async function getDashboardStats() {
            
    //         const [{data: genderData}, ageRes] = await Promise.all([
    //             DashboardService.getStudentsGenderYTD(),
    //             DashboardService.getStudentsAgeYTD()
    //         ])
    //         setShouldRefetch(false)
    //         setStudentsGenderGraph(genderData)

    //     }
    //     if (shouldRefetch) {
    //         getDashboardStats()
    //     }
    // }, []);

    return (
        <div className='flex w-full gap-4'>
        {/* <div className="card w-full">
            <h3>Students Gender</h3>
            <Chart type="bar" data={studentsGenderData} options={chartOptions} />
        </div>
        <div className="card w-full">
            <h3>Students Age YTD</h3>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div> */}
        </div>
    )
}
        