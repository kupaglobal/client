import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Signup from "../../pages/Auth/Signup";
import { Card } from "@mui/material";
import Logo from "../../assets/Kupalogo.svg"
import Login from "../../pages/Auth/Login";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import ChangePassword from "../../pages/Auth/ChangePassword";
import EmailVerification from "../../pages/Auth/EmailVerification";
import UpsertProfile from "../../pages/Auth/UpsertProfile";

const AuthLayout = ({ children }) => {
    return (
    <div className="page__container">
      <Card className="w-full lg:w-4 justify-center m-auto lg:mt-2">
        <div className="text-center mt-20">
            <div id="logo-container" className="mb-3 px-0 bg-bluegray-900 p-4">
                <img src={Logo} alt="Kupa Global" height={100} />
            </div>
        </div>
        <main className="p-4">
          <Routes>
            <Route path="/*" element={<Dashboard />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/verify-email" element={<EmailVerification />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/change-password" element={<ChangePassword />}/>
            <Route path="/profile" element={<UpsertProfile />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </main>
      </Card>
    </div>
  );
};

export default AuthLayout;
