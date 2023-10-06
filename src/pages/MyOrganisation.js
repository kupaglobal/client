// import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

// const handleButtonClick = (row) => {
//   console.log("Button clicked for row:", row);
// };

// const columns = [
//   {
//     id: "avatar",
//     name: "No.",
//     selector: (row) => row.avatar,
//     sortable: true,
//   },
//   {
//     id: "st_name",
//     name: "Student Name",
//     selector: (row) => row.st_name,
//     sortable: true,
//   },
//   {
//     id: "st_course",
//     name: "Course",
//     selector: (row) => row.st_course,
//     sortable: true,
//   },
//   {
//     id: "st_gender",
//     name: "Gender",
//     selector: (row) => row.st_gender,
//     sortable: true,
//   },
//   {
//     id: "st_class",
//     name: "Cohort #",
//     selector: (row) => row.st_class,
//     sortable: true,
//   },
// ];
// const tableRowItem = "students";

// const rows = [
//   {
//     avatar: "1",
//     st_name: "Bisola Davis",
//     st_course: "English",
//     st_gender: "Female",
//     st_class: "Cohort 3",
//   },
//   {
//     avatar: "1",
//     st_name: "Peace Ishimwe",
//     st_course: "Mathematics",
//     st_gender: "Male",
//     st_class: "Cohort 4",
//   },
//   {
//     avatar: "1",
//     st_name: "Jhohn Ishimwe",
//     st_course: "Science",
//     st_gender: "Female",
//     st_class: "Cohort 3",
//   },
//   {
//     avatar: "1",
//     st_name: "Michael Ishimwe",
//     st_course: "Science",
//     st_gender: "Male",
//     st_class: "Cohort 4",
//   },
//   {
//     avatar: "1",
//     st_name: "Moyosore Weke",
//     st_course: "English",
//     st_gender: "Female",
//     st_class: "Cohort 2",
//   },
// ];

const saveNewOrganisation = () => {}
const footerContent = (

  <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
  {/* <Button
      label="Cancel"
      icon="pi pi-times"
      onClick={() => setVisible(false)}
      className="custom-button"
      outlined
  /> */}
  <Button
      label="Save"
      icon="pi pi-building"
      onClick={() => saveNewOrganisation()}
      className="custom-button"
  />
  </div>
);

const OrganisationContainer = () => {
  // const [value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <Dialog
        header="New organisation"
        visible={true}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => {}}
        footer={footerContent}
      > 
        <div>
          {/* <NewOrganisationForm/> */}
          Put new organisation form here
        </div>
      </Dialog>
      <TabView>
        <TabPanel header="My Organisation" leftIcon="" style={{ fontSize: "14px" }}>
        </TabPanel>
        <TabPanel header="Team Members" rightIcon="" style={{ fontSize: "14px" }}>

        </TabPanel>
      </TabView>
    </div>
  );
};

export default OrganisationContainer;
