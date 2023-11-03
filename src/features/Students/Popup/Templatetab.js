import Templateroutes from "./Templateroutes";
import TemplatesContainer from "./TemplatesContainer";
import Createroute1 from "./Createroute1";
import { TabView, TabPanel } from "primereact/tabview";

const Templatetab = () => {
  return (
    <>
      <TabView>
        <TabPanel header="Create Template" style={{ fontSize: "13px" }}>
          <Templateroutes case1card={Createroute1} section="Create Template" />
        </TabPanel>

        <TabPanel header="Saved Templates" style={{ fontSize: "13px" }}>
          <Templateroutes case1card={TemplatesContainer} section="Saved Templates"/>
        </TabPanel>
      </TabView>
    </>
  );
};

export default Templatetab;
