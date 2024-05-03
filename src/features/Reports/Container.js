
import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { ReportsService } from '../../services/reports.services';
import { Chart } from 'primereact/chart';
import * as moment from 'moment'
import Dropdowncomp from "../../components/Dropdown";
import CardLoadingSkeleton from '../../components/UI/Skeleton/CardLoadingSkeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { moneyFormatter, ucFirst } from '../../utils';
import CohortCostsGraph from './CohortCostsGraph';
import { CohortsService } from '../../services/cohorts.service';
import { toastStore } from '../../store/toast';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
export default function ReportsContainter( {handleDatesChange, handleCohortChange}) {
    const { toast } = useContext(toastStore)

    const startOfYear = new Date(new Date().getFullYear(), 0, 1)
    const today = new Date()
    const [dates, setDates] = useState([startOfYear, today])
    const [shouldRefetch, setShouldRefetch] = useState(true)
    const [stats, setStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [genderChartData, setGenderChartData ] = useState(null)
    const [genderChartOptions, setGenderChartOptions] = useState(null)
    const [totalFundingText, setTotalFundingText] = useState('')

    const [cohortCosts, setCohortCosts] = useState([])

    // const [dates, setDates] = useState([new Date(new Date().getFullYear(), 0, 1), new Date()]);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [queryParams] = useSearchParams()

    const queryCohortId = queryParams.get('cohortId') ? queryParams.get('cohortId') : null
    const [selectedCohortId, setSelectedCohortId] = useState(queryCohortId)

    const handleDateSelect = (e) => {
        if (!selectedStartDate) {
            setSelectedStartDate(e.value);
        } else {
            const startDate = selectedStartDate;
            const endDate = e.value;
            const dates = [startDate, endDate].sort((a, b) => a.getTime() - b.getTime())
            setDates(dates);
            handleDatesChange(dates.map(date => date.toString()), false)
            setSelectedStartDate(null);
            setIsLoading(true)
            setShouldRefetch(true)
        }
    };

    // useEffect(() => {
    //     if (dates[0] == startOfYear && dates[1] == today) {
    //         setDataFromText('Year-To-Date')
    //     } else {
    //         setDataFromText(`${cleanedDateStr(dates[0])} - ${cleanedDateStr(dates[1])}`)
    //     }
    // }, dates)

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const genderColors = ['primary', 'yellow']
    
        async function getStats() {
            try {
                const { data: reportsStats } = await ReportsService.getStats({ startDate: dates[0], endDate: dates[1], cohortId: selectedCohortId })

                setStats(reportsStats)
                setIsLoading(false)
                setShouldRefetch(false)

                const data = {
                    labels: Object.keys(reportsStats.genderSplit).map(key => ucFirst(key)),
                    datasets: [
                        {
                            data: Object.values(reportsStats.genderSplit),
                            backgroundColor: genderColors.map(color => documentStyle.getPropertyValue(`--${color}-300`)),
                            hoverBackgroundColor: genderColors.map(color => documentStyle.getPropertyValue(`--${color}-500`))
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
        
                setGenderChartData(data);
                setGenderChartOptions(options);
                try {
                    handleDatesChange(dates, true)
                 } catch (e) {
                     console.log('err', e)
                 }
             
           } catch (e) {
                setIsLoading(false)
                setShouldRefetch(false)
            }
        }
        async function getCohortCosts() {
            const { data: {cohortStats: cohortCostsData} } = await ReportsService.getCohortCosts({ startDate: dates[0], endDate: dates[1], cohortId: selectedCohortId })
            setCohortCosts(cohortCostsData)
        }
        async function fetchCohorts() {
            try {
              const {data: cohortsRes} = await CohortsService.getCohorts()
              const cohorts = cohortsRes.cohorts.map(cohort => ({ ...cohort, isSelected: false }))
              setCohorts(cohorts)
              const selectedCohort = queryCohortId ? cohorts.filter(cohort => cohort.id == queryCohortId)[0] : null
              setSelectedCohort(selectedCohort)
              handleCohortChange(selectedCohort)
              setIsLoading(false)
            } catch (e) {
              toast('error',e.response?.data?.message ? e.response?.data?.message : e.message)
              setIsLoading(false)
              console.log(e)
            }
        }

        if (shouldRefetch) {
            getStats()
            getCohortCosts()
        }
        if (shouldRefetch && cohorts === null) {
            fetchCohorts()
        }
    }, [shouldRefetch, dates])

    useEffect(() => {
        let fundingCostsPerCurrency = {}
        const uniqueCurrencies = [...new Set(cohortCosts.map(cohortCost => cohortCost.costOfFundedStudents.currency))]
        uniqueCurrencies.forEach(currency => {
            fundingCostsPerCurrency[currency] = cohortCosts.filter(cohortCost => cohortCost.costOfFundedStudents.currency === currency).map(cohortCost => cohortCost.costOfFundedStudents.totalCost).reduce((a, b) => a+b, 0)
        })

        let currencyParts = []
        Object.keys(fundingCostsPerCurrency).forEach(currency => {
            currencyParts.push(moneyFormatter(currency).format(fundingCostsPerCurrency[currency]))
        })
        setTotalFundingText(currencyParts.join(', '))

    }, [cohortCosts])

    const costPerStudentBody = (row) => {
        return moneyFormatter(row.costPerStudentCurrency?.toUpperCase() ?? 'USD').format(row.costPerStudent)
    }

    const costOfFundedStudentsBody = (row) => {
        return moneyFormatter(row.costOfFundedStudents?.currency?.toUpperCase() ?? 'USD').format(row.costOfFundedStudents.totalCost)
    }

    const cohortPeriodBody = (row) => {
        return `${moment(row.startDate).format('MM/DD/YYYY')} - ${moment(row.endDate).format('MM/DD/YYYY')}`
    }

    const [cohorts, setCohorts] = useState(null)
    const [selectedCohort, setSelectedCohort] = useState(null)
    const handleSelectedCohort = (cohort) => {
        setIsLoading(true)
        setSelectedCohort(cohort)
        setSelectedCohortId(cohort.id)
        setShouldRefetch(true)
        handleCohortChange(cohort)
    }

    return (
        <div className='flex flex-column w-full mt-8 gap-2'>
            <div className='flex flex-row w-full items-center justify-content-end gap-2'>
                <div className='flex card bg-grey  responsive'>
                    <span className="p-float-label">
                        <Dropdown value={selectedCohort} loading={true} onChange={(e) => handleSelectedCohort(e.value)} options={cohorts} optionLabel="name" 
                            placeholder="Select a cohort"/>
                                <label htmlFor="item">Cohort</label>
                    </span>

                </div>
                <div className='flex card bg-grey responsive mr-4'>
                    <span className="p-float-label">
                        <Calendar value={dates} onSelect={handleDateSelect} selectionMode="range" />
                        <label htmlFor="date_range">Start - End Date</label>
                    </span>
                </div>
            </div>

            {/* <p>Showing data from {dataFromText}</p> */}
            <div className='flex flex-row justify-content-center gap-2 w-full card bg-grey gap-4 responsive'>
                
                {!isLoading && stats ?  
                    <div className=' flex flex-row gap-8'>
                        <div className="flex flex-column py-4">
                            <span className='text-md font-bold text-yellow-900 '>Students</span>
                            
                            <Card className="md:w-15rem my-2 bg-primary">
                                <div>
                                    <div className=" text-white font-medium text-5xl">{stats.totalStudents}</div>
                                    <span className=" block text-purple-100 font-medium mb-3">Students</span>
                                </div>
                            </Card> 
                            <Card className="md:w-15rem mb-2 bg-purple-400">
                                <div>
                                    <div className="text-900 text-white font-medium text-3xl">{stats.ageRange.lowest} - {stats.ageRange.highest}</div>
                                    <span className="block text-purple-100 font-medium mb-3">Ages</span>
                                </div>
                            </Card> 
                            <div>
                                {genderChartData ?
                                <Chart type="doughnut" data={genderChartData} options={{genderChartOptions}} className="w-full md:w-15rem" /> : (<div className='bg-primary-500 p-4 text-white'>No gender data to display.</div>) }
                            </div>
                            
                        </div>
                        <div className="flex flex-column py-4">
                            <span className='text-md font-bold text-yellow-900 '>Cohorts</span>
                            
                            <Card className="md:w-15rem my-2 bg-white-400">
                                <div>
                                    <div className=" text-primary font-medium text-5xl">{stats.cohorts}</div>
                                    <span className=" block text-purple-400 font-medium mb-3">Cohorts</span>
                                </div>
                            </Card> 
                            <Card className="md:w-15rem mb-2 bg-white-400">
                                <div>
                                    <div className="text-900 text-purple-500 font-medium text-3xl">{stats.facilitators}</div>
                                    <span className="block text-purple-400 font-medium mb-3">Facilitators</span>
                                </div>
                            </Card> 
                            <Card className="md:w-15rem my-2 bg-white-400">
                                <div>
                                    <div className=" text-primary font-medium text-5xl">{totalFundingText}</div>
                                    <span className=" block text-purple-400 font-medium mb-3">Total Cost</span>
                                </div>
                            </Card> 
                        </div>
                        <div className="flex flex-column py-4">
                            <span className='text-md font-bold text-yellow-900 mb-1'>Achievements</span>
                            
                            <Card className="md:w-15rem mb-2 bg-primary">
                                <div>
                                    <div className="  text-900 text-white font-medium text-5xl">{stats.scholarships}</div>
                                    <span className=" block text-purple-100 font-medium mb-3">Scholarships</span>
                                </div>
                            </Card> 
                            <Card className="md:w-15rem mb-2 bg-purple-400">
                                <div>
                                    <div className="text-900 text-white font-medium text-3xl">{stats.internships}</div>
                                    <span className="block text-purple-100 font-medium mb-3">Internships</span>
                                </div>
                            </Card> 
                            {/* <Card className="md:w-15rem my-2 bg-primary">
                                <div>
                                    <div className=" text-white font-medium text-3xl">{stats.internships}</div>
                                    <span className=" block text-purple-100 font-medium mb-3">Internships</span>
                                </div>
                            </Card>  */}
                            
                        </div>

                    </div>
                    : 
                    <CardLoadingSkeleton />
                }
            </div>
            <div className='flex flex-row mt-4'>
                <Card className="flex w-full">
                    <h3 className='mb-4'>Cohort Costs</h3>
                    <CohortCostsGraph cohortCostsData={cohortCosts} />
                </Card>

            </div>
            <div className='flex flex-row justify-content-center gap-2 mt-4 card bg-grey'>
                <Card className="flex w-full">
                    <h3 className='mb-4'>Cohorts</h3>
                    <DataTable value={cohortCosts} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '74rem' }}>
                        <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                        <Column field="costPerStudent" header="Cost Per Student" body={costPerStudentBody} style={{ width: '25%' }}></Column>
                        <Column field="costOfFundedStudents" header="Cohort Cost"  body={costOfFundedStudentsBody} style={{ width: '25%' }}></Column>
                        <Column field="period" header="Period" body={cohortPeriodBody} style={{ width: '25%' }}></Column>
                    </DataTable>
                </Card>
            </div>
        </div>
    )
}
        