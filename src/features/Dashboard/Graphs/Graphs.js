
import React from 'react';
import StudentsGenderGraph from './StudentsGenderGraph';
import StudentsAgeGraph from './StudentsAgeGraph';

import { Card } from 'primereact/card';
import RemindersList from '../Reminders/ReminderList';
        
export default function StackedBarDemo() {

    return (
        <div className='flex flex-row justify-content-center gap-2  w-full card bg-grey gap-4 responsive'>
            <Card className="flex">
                <h3>Students Gender YTD</h3>
                <StudentsGenderGraph />
            </Card>
            <Card className="flex">
                <h3>Students Age Overall</h3>
                <StudentsAgeGraph />
            </Card> 
            <Card className="flex">
                <RemindersList />
            </Card> 
        </div>
    )
}
        