import React, { useContext } from 'react'
import WelcomePopup from '../features/Dashboard/Popup/WelcomePopup'
import { AuthService } from '../services/auth.service'
import { SET_LOGGED_IN_USER } from '../store/actions'
import { authStore } from '../store/auth'

const Dashboard = () => {
  try {
    // const profile = await AuthService.getProfile()
    // dispatch({ type: SET_LOGGED_IN_USER, payload: profile })
  } catch (e) {
//    console.error('')    
  }
//  const { state, dispatch } = useContext(authStore);
  
  return (
    <div>
      <h1 className='module__heading'>Dashboard Page</h1>
      <div style={{ alignSelf: "center"}}>
       <WelcomePopup user="Bakani"/>
      </div>

    </div>
  )
}

export default Dashboard;
