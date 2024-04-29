import React, { useContext, useState } from 'react'
import ReportsContainter from '../features/Reports/Container';
import { authStore } from '../store/auth';
import { cleanedDateStr } from '../utils/moment'
const Reports = () => {
  const { state } = useContext(authStore)
  const [dates, setDates] = useState([])
  const [selectedCohort, setSelectedCohort] = useState(null)

  const handleCohortChange = (cohort ) => {
    setSelectedCohort(cohort)
  }

  const handleDatesChange = (dates) => {
    setDates(dates.map(date => cleanedDateStr(date)))
  }
  return (
    <div>
      <h1 className='module__heading'>{state.loggedInUser.organisation.name} Reports ({dates[0]} - {dates[1]})</h1>
      {selectedCohort ? <span className='mt-2 text-sm  text-grey'>Cohort: {selectedCohort.name} </span> : null }
      <ReportsContainter handleDatesChange={handleDatesChange} handleCohortChange={handleCohortChange} />
    </div>
  )
}

export default Reports;
