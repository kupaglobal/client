import { useState } from "react";
import PropTypes from "prop-types";
import { Typography,Tabs, Tab, Box } from "@mui/material";
import Table from "../../components/Table/Table";
import Studentgroup from "./Studentgroup";
import MeatballMenu from "../../components/MeatballMenu";
import './student.css'

export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const handleButtonClick = (row) => {
  console.log("Button clicked for row:", row);
};



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
    name: "Class",
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
    },  {
      avatar: "1",
      st_name: "Moyosore Weke",
      st_course: "English",
      st_gender: "Female",
      st_class: "Cohort 2",
    },
];



const Studentcontainer = () => {

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
        >
          <Tab label="Students" {...a11yProps(0)} />
          <Tab label="Groups" {...a11yProps(1)} />
          <Tab label="Cohort" {...a11yProps(2)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Table columns={columns} data={rows} tableRowItem={tableRowItem}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Studentgroup/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <h1>This is cohort</h1>
      </CustomTabPanel>
    </Box>
  );
};

export default Studentcontainer;
