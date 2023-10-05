import React, { useContext } from "react";
import { authStore } from "../../store/auth";
import Navcomponent from "../Navbar/Navcomponent";

const UserDashboardLayout = ({ children }) => {
  const { state } = useContext(authStore)
  if (!state.loggedInUser) {
    window.location.href = '/auth/login'
  }

  return (
    <div>
      <Navcomponent/>
    </div>
  );
};

export default UserDashboardLayout;
