// import { useState } from "react";
import Table from "../../components/Table/Table";
import Studentgroup from "./Studentgroup";
import "./student.css";
import { TabView, TabPanel } from "primereact/tabview";
import Popupcontent from "./Popup/Popupcontent";


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
    selector: (row) => row.st_name,
    sortable: true,
  },
  {
    id: "st_course",
    name: "Course",
    selector: (row) => row.st_course,
    sortable: true,
  },
  {
    id: "st_gender",
    name: "Gender",
    selector: (row) => row.st_gender,
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

const rows = [
  {
    avatar: "1",
    st_name: "Bisola Davis",
    st_course: "English",
    st_gender: "Female",
    st_class: "Cohort 3",
  },
  {
    avatar: "1",
    st_name: "Peace Ishimwe",
    st_course: "Mathematics",
    st_gender: "Male",
    st_class: "Cohort 4",
  },
  {
    avatar: "1",
    st_name: "Jhohn Ishimwe",
    st_course: "Science",
    st_gender: "Female",
    st_class: "Cohort 3",
  },
  {
    avatar: "1",
    st_name: "Michael Ishimwe",
    st_course: "Science",
    st_gender: "Male",
    st_class: "Cohort 4",
  },
  {
    avatar: "1",
    st_name: "Moyosore Weke",
    st_course: "English",
    st_gender: "Female",
    st_class: "Cohort 2",
  },
];

const Studentcontainer = () => {
  // const [value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <TabView>
        <TabPanel header="STUDENTS" leftIcon="" style={{ fontSize: "14px" }}>
          <Table columns={columns} data={rows} tableRowItem={tableRowItem} popupContent={<Popupcontent/>}/>
        </TabPanel>
        <TabPanel header="GROUPS" rightIcon="" style={{ fontSize: "14px" }}>
          <Studentgroup />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Studentcontainer;
