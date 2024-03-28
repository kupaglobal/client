
import React from 'react';
import StudentsGenderGraph from './StudentsGenderGraph';
import StudentsAgeGraph from './StudentsAgeGraph';
import TopPerformers from './TopPerformers';

import { Card } from 'primereact/card';
import RemindersList from '../Reminders/ReminderList';
        
export default function DashboardGraphs() {

    return (
        <div className='flex flex-column w-full'>
            <div className='flex flex-row justify-content-center gap-2 w-full card bg-grey gap-4 responsive'>
                <Card className="flex">
                    <h3>Students Gender</h3>
                    <StudentsGenderGraph />
                </Card>
                <Card className="flex flex-column align-items-center justify-center border-0">
                    <h3>Students Ages</h3>
                    <StudentsAgeGraph />
                </Card> 
                <Card className="flex">
                    <RemindersList />
                </Card> 
            </div>
            <div className='flex flex-row justify-content-center gap-2 mt-4 card bg-grey'>
                <Card className="flex w-8">
                    <h3>Top Performers</h3>
                    <TopPerformers />
                </Card>
            </div>
        </div>
    )
}
        