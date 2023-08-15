import React from "react";
import "./navbar.css";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Students from "../../pages/Students";
import Assessments from "../../pages/Assessments";
import Reports from "../../pages/Reports";
import Feedback from "../../pages/Feedback";
import Inbox from "../../pages/Inbox";

const Navcomponent = () => {
  return (
    <div>
      <Sidebar>
      <div className='page__container' >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/students" element={<Students />}/>
          <Route path="/assessments" element={<Assessments/>}/>
          <Route path="/reportings" element={<Reports />}/>
          <Route path="/feedbacks" element={<Feedback />}/>
          <Route path="/inbox" element={<Inbox />}/>
        </Routes>
        </div>
      </Sidebar>
    </div>
  );
};

export default Navcomponent;
