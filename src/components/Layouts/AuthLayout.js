import React from "react";
import Students from "../../pages/Students";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Signup from "../../pages/Auth/Signup";
import { Card } from "@mui/material";
import Logo from "../../assets/Kupalogo.svg"
import Login from "../../pages/Auth/Login";
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
            <Route path="/profile" element={<UpsertProfile />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </main>
      </Card>
    </div>
  );
};

export default AuthLayout;
