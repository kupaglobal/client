import React from "react";
import Horiontalcard from "../../components/Cards/Horiontalcard";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";

const options = [
  { label: "Edit Group", icon: "pi pi-pencil" },
  { label: "Add Student", icon: "pi pi-user-plus" },
  { label: "Message Group", icon: "pi pi-comment" },
  { label: "Delete Group", icon: "pi pi-trash" },
];

const studentData = [
  {
    studentname1: "John Doe",
    studentname2: "Alice Johnson",
    studentname3: "Bob Smith",
    groupname: "Peer Group 2 English 101",
  },
  {
    studentname1: "Eva Martinez",
    studentname2: "David Wilson",
    studentname3: "Linda Davis",
    groupname: "Science Geeks",
  },
  {
    studentname1: "John Doe",
    studentname2: "Alice Johnson",
    studentname3: "Bob Smith",
    groupname: "Peer Group 4 Math101",
  },
  {
    studentname1: "Eva Martinez",
    studentname2: "David Wilson",
    studentname3: "Linda Davis",
    groupname: "All Females in Harare",
  },
  {
    studentname1: "Eva Martinez",
    studentname2: "David Wilson",
    studentname3: "Linda Davis",
    groupname: "Science Geeks",
  },
];

const Studentgroup = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="custom-button"
          icon={<AiOutlinePlus />}
          label="Group"
          outlined
        />
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {studentData.map((data, index) => (
          <Horiontalcard key={index} {...data} options={options} />
        ))}
      </div>
    </div>
  );
};

export default Studentgroup;
