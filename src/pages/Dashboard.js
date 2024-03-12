import React, { useContext } from 'react'
import WelcomePopup from '../features/Dashboard/Popup/WelcomePopup'
import Graphs from '../features/Dashboard/Graphs'
import { authStore } from '../store/auth'

const Dashboard = () => {
  const { state } = useContext(authStore)

  return (
    <div>
      <h1 className='module__heading'>Dashboard</h1>
      <div style={{ alignSelf: "center"}}>
       <WelcomePopup user={state.loggedInUser}/>
      </div>

      <section className='flex gap-2 pt-8'>
        <Graphs />
      </section>

    </div>
  )
}

export default Dashboard;
