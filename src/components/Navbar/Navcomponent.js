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
import MyOrganisation from "../../pages/MyOrganisation";
import Verticalcard from "../Cards/Verticalcard";
import Templateroute1 from "../../features/Students/Popup/Templateroute1";
import Studentdet from "../../features/Students/Studentsdetail/Studentdet";

const Navcomponent = () => {
  return (
    <div>
      <Sidebar>
        <div className='page__container' >
          <Routes>
            <Route path="/*" element={<Dashboard />}/>
            <Route path="/organisation" element={<MyOrganisation />}/> 
            <Route path="/students" element={<Students />}/>
            <Route path="/students/id" element={<Studentdet/>}/>

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
