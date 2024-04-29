import React, { useContext, useState } from 'react'
import ReportsContainter from '../features/Reports/Container';
import { authStore } from '../store/auth';
import { cleanedDateStr } from '../utils/moment'
const Reports = () => {
  const { state } = useContext(authStore)
  const [dates, setDates] = useState([])
  const handleDatesChange = (dates) => {
console.log('dates', dates)
    setDates(dates.map(date => cleanedDateStr(date)))
  }
  return (
    <div>
      <h1 className='module__heading'>{state.loggedInUser.organisation.name} Reports ({dates[0]} - {dates[1]})</h1>
      <ReportsContainter handleDatesChange={handleDatesChange} />
    </div>
  )
}

export default Reports;
