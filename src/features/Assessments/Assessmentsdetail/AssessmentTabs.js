import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import AssessmentDashboard from "./Tabs/AssessmentDashboard";
import AssessmentResultsContainer from "./Tabs/AssessmentResultsContainer";

const AssessmentTabs = ({ onReload, isLoading }) => {

    return (
    <Card style={{ width: "60vw" }}>
      <TabView>
      <TabPanel
          header="Dashboard"
          leftIcon=""
          style={{ fontSize: "14px" }}
        >
          <AssessmentDashboard/>
        </TabPanel>
        <TabPanel
          header="Student Results"
          leftIcon=""
          style={{ fontSize: "14px" }}
        >
          <AssessmentResultsContainer onFilter={onReload} isLoading={isLoading} />
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
