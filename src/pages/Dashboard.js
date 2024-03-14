import React, { useContext } from 'react'
import WelcomePopup from '../features/Dashboard/Popup/WelcomePopup'
import Graphs from '../features/Dashboard/Graphs/Graphs'
import { authStore } from '../store/auth'

const Dashboard = () => {
  const { state } = useContext(authStore)

  return (
    <div>
      <h1 className='module__heading'>{state.loggedInUser?.organisation?.name} Dashboard</h1>
      <div style={{ alignSelf: "center"}}>
       <WelcomePopup user={state.loggedInUser}/>
      </div>

      <section className='flex w-full p-fluid pt-6'>
        <Graphs />
      </section>

    </div>
  )
}

export default Dashboard;
