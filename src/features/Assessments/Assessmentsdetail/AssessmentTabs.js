import React, { useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import AssessmentDashboard from "./Tabs/AssessmentDashboard";
import AssessmentResultsContainer from "./Tabs/AssessmentResultsContainer";
import { assessmentsStore } from "../../../store/assessments";

const AssessmentTabs = () => {
    const { state } = useContext(assessmentsStore)
    const assessment = state.currentAssessment
  return (
    <Card style={{ width: "60vw" }}>
      <TabView>
      <TabPanel
          header="Dashboard"
          leftIcon=""
          style={{ fontSize: "14px" }}
        >
          <AssessmentDashboard assessment={assessment}/>
        </TabPanel>
        <TabPanel
          header="Student Results"
          leftIcon=""
          style={{ fontSize: "14px" }}
        >
          <AssessmentResultsContainer assessment={assessment}/>
        </TabPanel>
        {/* <TabPanel
          header="Achievements"
          rightIcon=""
          style={{ fontSize: "14px" }}
        >
          <Tab2 student={student} />
        </TabPanel>
        <TabPanel
          header="Performance"
          rightIcon=""
          style={{ fontSize: "14px" }}
        >
          <Tab3 />
        </TabPanel>
        <TabPanel header="Portfolio" rightIcon="" style={{ fontSize: "14px" }}>
          <Tab4 student={student} />
        </TabPanel> */}
      </TabView>
    </Card>
  );
};

export default AssessmentTabs;
