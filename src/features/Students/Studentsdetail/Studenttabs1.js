import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import Tab1 from "./Tabs/Tab1";
import Tab2 from "./Tabs/Tab2";
import Tab4 from "./Tabs/Tab4";
import Tab5 from "./Tabs/Tab5";
import Tab3 from "./Tabs/Tab3";

const Studenttabs1 = ({ student }) => {
  return (
    <Card style={{ width: "60vw" }}>
      <TabView>
        <TabPanel
          header="Student Details"
          leftIcon=""
          style={{ fontSize: "14px" }}
        >
          <Tab1 student={student}/>
        </TabPanel>
        <TabPanel
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
          <Tab3 student={student}/>
        </TabPanel>
        <TabPanel header="Portfolio" rightIcon="" style={{ fontSize: "14px" }}>
          <Tab4 student={student} />
        </TabPanel>
        <TabPanel header={`Feedback${student.feedback && student.feedback.length > 0 ? ` (${student.feedback.length})` : ''}`} rightIcon="" style={{ fontSize: "14px" }}>
          <Tab5 student={student} />
        </TabPanel>
      </TabView>
    </Card>
  );
};

export default Studenttabs1;
