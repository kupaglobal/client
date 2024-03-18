
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import {DashboardService} from '../../../services/dashboard.service'

export default function StudentsAgeGraph() {
    const [studentsAgeData, setStudentsAgeData] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getStudentsAgeStats() {
            try {
                setIsLoading(true)
                const {data: ageData} = await DashboardService.getStudentsAgeYTD()
                setShouldRefetch(false)
                setStudentsAgeData(ageData)
                setIsLoading(false)
            } catch (e) {
                console.error('error fetching')
                setIsLoading(false)
            }
        }
        if (shouldRefetch) {
            getStudentsAgeStats()
        }
    }, [shouldRefetch]);

    return (
        <>  {studentsAgeData && !isLoading ? 
            <div className='mt-4'>
                <Card className="md:w-15rem mb-2 bg-primary">
                    <div>
                        <div className="text-right text-white font-medium text-xl">{studentsAgeData.lowestAge}</div>
                        <span className="text-right block text-purple-100 font-medium mb-3">Lowest</span>
                    </div>
                </Card> 
                <Card className="md:w-15rem mb-2 bg-purple-400">
                    <div>
                        <div className="text-900 text-white font-medium text-xl">{studentsAgeData.averageAge}</div>
                        <span className="block text-purple-100 font-medium mb-3">Average</span>
                    </div>
                </Card> 
                <Card className="md:w-15rem mb-2 bg-primary">
                    <div>
                        <div className="text-right text-white font-medium text-xl">{studentsAgeData.highestAge}</div>
                        <span className="text-right block text-purple-100 font-medium mb-3">Highest</span>
                    </div>
                </Card> 
            </div>
            : null 
            }
        </>
    )

}