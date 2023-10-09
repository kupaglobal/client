import React, { useContext, useState } from 'react'
import WelcomePopup from '../features/Dashboard/Popup/WelcomePopup'
import { authStore } from '../store/auth'

const Dashboard = () => {
  const { state } = useContext(authStore)

  return (
    <div>
      <h1 className='module__heading'>Dashboard Page</h1>
      <div style={{ alignSelf: "center"}}>
       <WelcomePopup user={state.loggedInUser?.firstName ? ` ${state.loggedInUser.firstName}` : ""}/>
      </div>

    </div>
  )
}

export default Dashboard;
