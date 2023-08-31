import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import Tab1 from "./Tabs/Tab1";
import Tab2 from "./Tabs/Tab2";
import Tab4 from "./Tabs/Tab4";
import Tab3 from "./Tabs/Tab3";

const Studenttabs1 = () => {
  return (
    <Card style={{ width: "60vw" }}>
      <TabView>
        <TabPanel
          header="Student Details"
          leftIcon=""
          style={{ fontSize: "14px" }}
        >
          <Tab1 />
        </TabPanel>
        <TabPanel
          header="Achievements"
          rightIcon=""
          style={{ fontSize: "14px" }}
        >
          <Tab2 />
        </TabPanel>
        <TabPanel
          header="Performance"
          rightIcon=""
          style={{ fontSize: "14px" }}
        >
          <Tab3 />
        </TabPanel>
        <TabPanel header="Portfolio" rightIcon="" style={{ fontSize: "14px" }}>
          <Tab4 />
        </TabPanel>
      </TabView>
    </Card>
  );
};

export default Studenttabs1;
