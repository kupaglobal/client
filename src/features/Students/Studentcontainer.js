// import { useState } from "react";
import Table from "../../components/Table/Table";
import Studenttag from "../Tags/Studenttag";
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
import { studentName, ucFirst } from "../../utils";
import { CohortsService } from "../../services/cohorts.service";
import { cleanedDateStr } from "../../utils/moment";

// const handleButtonClick = (row) => {
//   console.log("Button clicked for row:", row);
// };

const columns = [
  {
    id: "avatar",
    name: "No.",
    width: '10%',
    selector: (row) => row.studentNumber,
    sortable: true,
  },
  {
    id: "st_name",
    name: "Student Name",
    body: studentName,
    width: '25%',
    selector: studentName,//(row) => `${row.firstName} ${row.middleName ? ` ${row.middleName} `: ''}${row.lastName} ${topPerformerTrophy(row)}`,
    sortable: true,
  },
  // {
  //   id: "st_course",
  //   name: "Course",
  //   selector: (row) => row.courseEnrollment,
  //   sortable: true,
  // },
  {
    id: "st_gender",
    name: "Gender",
    width: '10%',
    selector: (row) => ucFirst(row.gender),
    sortable: true,
  },
  {
    id: "st_class",
    name: "Cohort",
    width: '21%',
    selector: (row) => row.cohorts?.map(cohort => <><p className="mt-1">{cohort.name}</p></>),
    sortable: true,
  },
  {
    id: "st_city",
    name: "City",
    width: '10%',
    selector: (row) => row.city,
    sortable: true,
  },
  {
    id: "st_yearOfBirth",
    name: "Year of Birth",
    width: '10%',
    selector: (row) => row.yearOfBirth,
    sortable: true,
  },
  {
    id: "st_dateCreated",
    name: "Date Added",
    width: '10%',
    selector: (row) => cleanedDateStr(row.dateCreated),
    sortable: true,
  },
];
const tableRowItem = "students";


const Studentcontainer = () => {
  const tabs = ['Students', 'Cohorts', 'Tags']
  const [queryParams] = useSearchParams()
  const index = queryParams.get('a') ? tabs.indexOf(queryParams.get('a')) : 0
  const [ selectedTab ] = useState(index >= 0 ? index : 0)

  const [ selectedCohortId ] = useState(queryParams.get('cohortId') ? queryParams.get('cohortId') : null)
  const [ selectedCohort, setSelectedCohort ] = useState(null)

  const [ students, setStudents ] = useState([])
  const { toast } = useContext(toastStore);
  const [ reloadStudents, setReloadStudents ] = useState(true)
  const { dispatch } = useContext(studentsStore)
  const { state: authState } = useContext(authStore)

  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, count: 0 })
  const [ filterOptions, setFilterOptions ] = useState([])
  const [ selectedFilterOptions, setSelectedFilterOptions ] = useState({
    cohortId: selectedCohortId,
    limit: 50
  }) 
  const [isLoading, setIsLoading] = useState(false)
  const handleStudentsFilter = (selectedFilterOptions) => {
    setSelectedFilterOptions(selectedFilterOptions)
    console.log('to send', selectedFilterOptions)
    setReloadStudents(true)
  }

  const handlePaginationChange = (newPagination) => {
    setSelectedFilterOptions({
      ...selectedFilterOptions,
      page: newPagination.page,
      limit: newPagination.limit
    })
    console.log('about to send', selectedFilterOptions)
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
        setPagination(studentsRes.pagination)
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
    async function fetchSelectedCohort() {
      if (selectedCohortId) {
        try {
          const {data: cohort} = await CohortsService.getCohort(selectedCohortId)
          setSelectedCohort(cohort)
        } catch (e) {
          toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
          console.log(e)
        }
      }
    }
    if (reloadStudents) {
      fetchSelectedCohort()
      fetchStudents()
    }
  }, [reloadStudents, toast, selectedFilterOptions, selectedCohortId])

  const handleSelectedRowsChanged = ({selectedRows}) => {
    dispatch({ 
      type: SET_SELECTED_STUDENTS,
      payload: selectedRows
    })
  }

  const tagsContainer = authState.loggedInUser.role === 'FACILITATOR' ? "" : (
    <TabPanel header="Tags" rightIcon="" style={{ fontSize: "14px" }}>
      <Studenttag user={authState.loggedInUser} />
    </TabPanel>
)
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <TabView activeIndex={selectedTab}>
        <TabPanel header={selectedCohort ? `Students (${selectedCohort.name} Cohort)` : 'Students'} leftIcon="" style={{ fontSize: "14px" }}>
          <Table
            isLoading={isLoading}
            columns={columns}
            data={students}
            filterOptions={filterOptions}
            onFilter={handleStudentsFilter}
            tableRowItem={tableRowItem}
            popupContent={<Popupcontent currentCohort={selectedCohort} onReload={() => setReloadStudents(true)} loggedInUser={authState.loggedInUser} />}
            handleSelectedRowsChanged={handleSelectedRowsChanged}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            />
        </TabPanel>
        <TabPanel header="Cohorts" rightIcon="" style={{ fontSize: "14px" }}>
          <Studentcohort user={authState.loggedInUser} />
        </TabPanel>
        {tagsContainer}
      </TabView>
    </div>
  );
};

export default Studentcontainer;
