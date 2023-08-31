import * as React from "react";
import Templateroutes from "./Templateroutes";
import Verticalcard from "../../../components/Cards/Verticalcard";
import Createroute1 from "./Createroute1";
import { TabView, TabPanel } from "primereact/tabview";


const Templatetab = () => {

  return (
    <>
      <TabView>
        <TabPanel header="Create Template" style={{ fontSize: "13px" }}>
          <Templateroutes case1card={Createroute1} />
        </TabPanel>

        <TabPanel header="Saved Template" style={{ fontSize: "13px" }}>
          <Templateroutes case1card={Verticalcard} />
        </TabPanel>
      </TabView>
    </>
  );
};

export default Templatetab;
