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
    id: "ass_name",
    name: "Assessment Name",
    selector: (row) => row.name,
    sortable: true,
    width: '20%'
  },
  {
    id: "ass_type",
    name: "Assessment Type",
    selector: (row) => ucFirst(row.type),
    sortable: true,
    width: '15%'
  },
  {
    id: "description",
    name: "Description",
    selector: (row) => ucFirst(row.description),
    style: {wordWrap: 'break-word'},
    wrap: true,
    width: '45%'
  },
  {
    id: "ass_dateConducted",
    name: "Date Created",
    selector: (row) => cleanedDateStr(row.dateCreated),
    sortable: true,
  },
];
const tableRowItem = "assessments";

const Assessmentscontainer = () => {
  const tabs = ['Assessments']
  const [queryParams] = useSearchParams()
  const index = queryParams.get('a') ? tabs.indexOf(queryParams.get('a')) : 0
  const [ selectedTab] = useState(index >= 0 ? index : 0)

  const [pagination, setPagination] = useState({ page: 1, limit: 10})
  const [assessments, setAssessments] = useState([])
  const { toast } = useContext(toastStore);
  const [ reloadAssessments, setReloadAssessments ] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const handlePaginationChange = (newPagination) => {
    setPagination({
      page: newPagination.page,
      limit: newPagination.limit
    })
    setReloadAssessments(true)
  }

  useEffect(() => {
    async function fetchAssessments() {
      setReloadAssessments(false)
      try {
        const {data: assessmentsRes} = await AssessmentsService.getAssessments({ page: pagination.page, limit: pagination.limit })
        const assessments = assessmentsRes.assessments.map(assessment => ({ ...assessment, isSelected: false }))
        setAssessments(assessments)
        setPagination(assessmentsRes.pagination)
        setIsLoading(false)
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
        setIsLoading(false)
      }
    }
    if (reloadAssessments) {
      fetchAssessments()
    }
  }, [reloadAssessments, toast, pagination])

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <TabView activeIndex={selectedTab}>
        <TabPanel header="ASSESSMENTS" leftIcon="" style={{ fontSize: "14px" }}>
          <Table isLoading={isLoading} columns={columns} data={assessments} tableRowItem={tableRowItem} popupContent={<Popupcontent onReload={() => setReloadAssessments(true)}/>}
          pagination={pagination} onPaginationChange={handlePaginationChange}>
            </Table>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Assessmentscontainer;
