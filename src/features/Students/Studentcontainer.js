// import { useState } from "react";
import Table from "../../components/Table/Table";
import Studentgroup from "./Studentgroup";
import "./student.css";
import { TabView, TabPanel } from "primereact/tabview";
import Popupcontent from "./Popup/Popupcontent";
import { toastStore } from "../../store/toast";
import { useContext, useEffect, useState } from "react";
import { StudentsService } from "../../services/students.service";


// const handleButtonClick = (row) => {
//   console.log("Button clicked for row:", row);
// };


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
    selector: (row) => `${row.firstName} ${row.lastName}`,
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
    selector: (row) => row.gender,
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
  const [students, setStudents] = useState([])
  const { toast } = useContext(toastStore);
  const [ reloadStudents, setReloadStudents ] = useState(false)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const {data: studentsRes} = await StudentsService.getStudents()
        const students = studentsRes.students.map(student => ({ ...student, isSelected: false }))
        setStudents(students)
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    if (reloadStudents) {
      fetchStudents()
    }
  }, [reloadStudents, toast])

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <TabView>
        <TabPanel header="STUDENTS" leftIcon="" style={{ fontSize: "14px" }}>
          <Table columns={columns} data={students} tableRowItem={tableRowItem} popupContent={<Popupcontent onReload={() => setReloadStudents(true)}/>}/>
        </TabPanel>
        <TabPanel header="GROUPS" rightIcon="" style={{ fontSize: "14px" }}>
          <Studentgroup />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Studentcontainer;
