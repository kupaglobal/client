// import { useState } from "react";
import Table from "../../components/Table/Table";
import Studentgroup from "../Groups/Studentgroup";
import Studentcohort from "../Cohorts/Studentcohort";
import "./student.css";
import { TabView, TabPanel } from "primereact/tabview";
import Popupcontent from "./Popup/Popupcontent";
import { toastStore } from "../../store/toast";
import { useContext, useEffect, useState } from "react";
import { StudentsService } from "../../services/students.service";
import { studentsStore } from "../../store/students";
import { SET_SELECTED_STUDENTS } from "../../store/actions";
import { useSearchParams } from "react-router-dom";
import { authStore } from "../../store/auth";
import { rankTrophy, ucFirst } from "../../utils";
import { Tooltip } from "primereact/tooltip";

// const handleButtonClick = (row) => {
//   console.log("Button clicked for row:", row);
// };
const studentName = (row) => {
  const name = `${row.firstName} ${row.middleName ? ` ${row.middleName} `: ''}${row.lastName}`
  return (row.topPerformerRank && row.topPerformerScore) ? <><Tooltip target=".tooltip"/><span className="tooltip" data-pr-tooltip={`#${row.topPerformerRank} Top Performer`}>{name} {rankTrophy[row.topPerformerRank]}</span></> : name
}

const columns = [
  {
    id: "avatar",
    name: "No.",
    selector: (row) => row.avatar,
    sortable: true,
  },
  {
    id: "st_name",
    name: "Student Name",
    body: studentName,
    selector: studentName,//(row) => `${row.firstName} ${row.middleName ? ` ${row.middleName} `: ''}${row.lastName} ${topPerformerTrophy(row)}`,
    sortable: true,
  },
  {
    id: "st_course",
    name: "Course",
    selector: (row) => row.courseEnrollment,
    sortable: true,
  },
  {
    id: "st_gender",
    name: "Gender",
    selector: (row) => ucFirst(row.gender),
    sortable: true,
  },
  {
    id: "st_class",
    name: "Cohort #",
    selector: (row) => row.st_class,
    sortable: true,
  },
];
const tableRowItem = "students";


const Studentcontainer = () => {
  const tabs = ['Students', 'Cohorts', 'Groups']
  const [queryParams] = useSearchParams()
  const index = queryParams.get('a') ? tabs.indexOf(queryParams.get('a')) : 0
  const [ selectedTab ] = useState(index >= 0 ? index : 0)

  const [ selectedCohortId ] = useState(queryParams.get('cohortId') ? queryParams.get('cohortId') : null)

  const [ students, setStudents ] = useState([])
  const { toast } = useContext(toastStore);
  const [ reloadStudents, setReloadStudents ] = useState(true)
  const { dispatch } = useContext(studentsStore)
  const { state: authState } = useContext(authStore)

  const [ filterOptions, setFilterOptions ] = useState([])
  const [ selectedFilterOptions, setSelectedFilterOptions ] = useState({
    cohortId: selectedCohortId
  }) 
  const [isLoading, setIsLoading] = useState(false)
  const handleStudentsFilter = (selectedFilterOptions) => {
    setSelectedFilterOptions(selectedFilterOptions)
    console.log('to send', selectedFilterOptions)
    setReloadStudents(true)
  }

  useEffect(() => {
    async function fetchStudents() {
      setReloadStudents(false)
      setIsLoading(true)
      try {
        const {data: studentsRes} = await StudentsService.getStudents(selectedFilterOptions)
        const students = studentsRes.students.map(student => ({ ...student, isSelected: false }))
        setStudents(students)
        setFilterOptions(studentsRes.filterOptions?.map(option => { 
          option.filterValue = ''
          if (option.id==='cohortId') {
            option.filterValue = selectedCohortId
          }
          return {...option, isRange: false}
        }) ?? [])
        setIsLoading(false)
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
        setIsLoading(false)
      }
    }
    if (reloadStudents) {
      fetchStudents()
    }
  }, [reloadStudents, toast, selectedFilterOptions, selectedCohortId])

  const handleSelectedRowsChanged = ({selectedRows}) => {
    dispatch({ 
      type: SET_SELECTED_STUDENTS,
      payload: selectedRows
    })
  }

  const groupsContainer = authState.loggedInUser.role === 'FACILITATOR' ? "" : (
    <TabPanel header="GROUPS" rightIcon="" style={{ fontSize: "14px" }}>
      <Studentgroup />
    </TabPanel>
)
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <TabView activeIndex={selectedTab}>
        <TabPanel header="STUDENTS" leftIcon="" style={{ fontSize: "14px" }}>
          <Table isLoading={isLoading} columns={columns} data={students} filterOptions={filterOptions} onFilter={handleStudentsFilter} tableRowItem={tableRowItem} popupContent={<Popupcontent onReload={() => setReloadStudents(true)}/>} handleSelectedRowsChanged={handleSelectedRowsChanged}/>
        </TabPanel>
        <TabPanel header="COHORTS" rightIcon="" style={{ fontSize: "14px" }}>
          <Studentcohort user={authState.loggedInUser} />
        </TabPanel>
        {groupsContainer}
      </TabView>
    </div>
  );
};

export default Studentcontainer;
