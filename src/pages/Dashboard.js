import React, { useContext, useEffect, useState } from 'react'
import WelcomePopup from '../features/Dashboard/Popup/WelcomePopup'
import { AuthService } from '../services/auth.service'
import { SET_LOGGED_IN_USER } from '../store/actions'
import { authStore } from '../store/auth'

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null)
//  const { dispatch } = useContext(authStore);  
  return (
    <div>
      <h1 className='module__heading'>Dashboard Page</h1>
      <div style={{ alignSelf: "center"}}>
       <WelcomePopup user={currentUser?.firstName ? ` ${currentUser.firstName}` : ""}/>
      </div>

    </div>
  )
}

export default Dashboard;
