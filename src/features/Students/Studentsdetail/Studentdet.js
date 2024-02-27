import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs";
import Studentcontent from "./Studentcontent";
import Studenttabs1 from "./Studenttabs1";
import MeatballMenu from "../../../components/MeatballMenu";
import { useParams } from "react-router-dom";
import { StudentsService } from "../../../services/students.service";
import { authStore } from "../../../store/auth";

const Studentdet = () => {
  const breadCrumbs = "Students";
  const breadCrumbsLinkTo = "students";
  const [student, setStudent] = useState(null)
  const studentId = useParams().id
  const {state: authState} = useContext(authStore)

  const options = [
    { label: "Upload new student data", icon: "pi pi-upload"},
    { label: "Request for feedback", icon: "pi pi-comments" },
  ];

  useEffect(() => {
    async function fetchStudent() {
      const {data: student} = await StudentsService.getSingleStudent(studentId)
      Object.keys(student).forEach(key => {
        if (student[key] === null) {
          student[key] = 'N/a'
        }
      })
      setStudent(student)
    } 
    fetchStudent()
  }, [studentId])

  return (
    <div>
      <Breadcrumb
        name="Student Name"
        firstItem={breadCrumbs}
        linkTo={breadCrumbsLinkTo}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MeatballMenu options={options} />
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          {student ? <Studentcontent student={student} setStudent={setStudent} user={authState.loggedInUser}/> : ''}
        </div>
        <div>
          {student ? <Studenttabs1 student={student} /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Studentdet;
