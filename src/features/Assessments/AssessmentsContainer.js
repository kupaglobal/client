// import { useState } from "react";
import Table from "../../components/Table/Table";
import "./assessments.css";
import { TabView, TabPanel } from "primereact/tabview";
import Popupcontent from "./Popup/CreateAssessmentPopup";
import { toastStore } from "../../store/toast";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AssessmentsService } from "../../services/assessments.service";
import { ucFirst } from "../../utils"
import { cleanedDateStr } from "../../utils/moment";

// const handleButtonClick = (row) => {
//   console.log("Button clicked for row:", row);
// };

const columns = [
  {
    id: "ass_id",
    name: "ID.",
    selector: (row) => row.avatar,
    sortable: true,
  },
  {
    id: "ass_name",
    name: "Assessment Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    id: "ass_type",
    name: "Assessment Type",
    selector: (row) => ucFirst(row.type),
    sortable: true,
  },
  {
    id: "ass_dateConducted",
    name: "Date Conducted",
    selector: (row) => cleanedDateStr(row.dateConducted),
    sortable: true,
  },
  {
    id: "ass_description",
    name: "Description",
    selector: (row) => ucFirst(row.description),
    sortable: true,
  },
];
const tableRowItem = "assessments";


const Assessmentscontainer = () => {
  const tabs = ['Assessments']
  const [queryParams] = useSearchParams()
  const index = queryParams.get('a') ? tabs.indexOf(queryParams.get('a')) : 0
  const [ selectedTab] = useState(index >= 0 ? index : 0)

  const [assessments, setAssessments] = useState([])
  const { toast } = useContext(toastStore);
  const [ reloadAssessments, setReloadAssessments ] = useState(true)

  useEffect(() => {
    async function fetchAssessments() {
      setReloadAssessments(false)
      try {
        const {data: assessmentsRes} = await AssessmentsService.getAssessments()
        const assessments = assessmentsRes.assessments.map(assessment => ({ ...assessment, isSelected: false }))
        setAssessments(assessments)
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    if (reloadAssessments) {
      fetchAssessments()
    }
  }, [reloadAssessments, toast])

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <TabView activeIndex={selectedTab}>
        <TabPanel header="ASSESSMENTS" leftIcon="" style={{ fontSize: "14px" }}>
          <Table columns={columns} data={assessments} tableRowItem={tableRowItem} popupContent={<Popupcontent onReload={() => setReloadAssessments(true)}/>}/>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Assessmentscontainer;
