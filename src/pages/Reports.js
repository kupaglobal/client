import React, { useContext } from 'react'
import ReportsContainter from '../features/Reports/Container';
import { authStore } from '../store/auth';

const Reports = () => {
  const { state } = useContext(authStore)
  return (
    <div>
      <h1 className='module__heading'>{state.loggedInUser.organisation.name} Reports</h1>
      <ReportsContainter />

    </div>
  )
}

export default Reports;
