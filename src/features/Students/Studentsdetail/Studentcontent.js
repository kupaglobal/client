import React, { useContext } from "react";
import Avatar from "react-avatar";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Card } from "primereact/card";
import DetailsContent from "../../../components/DetailsContent";
import { BiLogoWhatsapp } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Link } from "react-router-dom";
import EditStudentDetailsForm from "./EditStudentDetailsForm";
import { Dialog } from "primereact/dialog";
import { StudentsService } from "../../../services/students.service";
import { studentFullName } from "../../../utils";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { toastStore } from "../../../store/toast";

const Studentcontent = ({ student, setStudent, user, reloadStudent }) => {
  const handleClickOpen = () => {};
  const categories = [
    { name: "Review assessment", key: "RA" },
    { name: "Submit portfolio files", key: "SPF" },
    { name: "Request for feedback", key: "RCE" },
  ];

  const [selectedCategories] = useState([categories[1]]);
  const userDetails = [
    { heading: "Student Number", paragraph: student.studentNumber },
    { heading: "Year of Birth", paragraph: student.yearOfBirth },
    { heading: "Gender", paragraph: student.gender },
    { heading: "Cohort", paragraph: student.cohorts.map(cohort => cohort.name).join(', ') },
    { heading: "City, Country", paragraph: `${student.city} ${student.country}` },
  ];

  Object.keys(student).forEach(key => {
    if (student[key] === 'N/a') {
      student[key] = ''
    }
  })
  const { toast } = useContext(toastStore)
//  student.gender = ucFirst(student.gender)

  const [updateStudentDetailsFormData, setUpdateStudentDetailsFormData] = useState(student)
  const [showEditStudentDetailsForm, setShowEditStudentDetailsForm] = useState(false)
  const [showDeleteStudentDialog, setShowDeleteStudentDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateStudentDetails = async () => {
    try {
      if (updateStudentDetailsFormData.gender) {
        updateStudentDetailsFormData.gender = updateStudentDetailsFormData.gender.toUpperCase();
      }
      setIsLoading(true)
      const {data: updatedStudent} = await StudentsService.updateStudentDetails(student.id, updateStudentDetailsFormData)
      setStudent(updatedStudent)
      setShowEditStudentDetailsForm(false)
      setIsLoading(false)
      reloadStudent()
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }
  const showDeletePopup = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to delete ${student.firstName}${student.middleNames ? student.middleNames : ''} ${student.lastName}?`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: deleteStudent,
      reject: () => {}
    });        
  }

  const deleteStudent = async () => {
    setIsLoading(true)

    try {
      await StudentsService.deleteStudents([student.id]);
      toast('success', 'Student has been deleted.');
      setIsLoading(false)
      setTimeout(() => {
        window.location.href = '/students'
      }, 1500)
    } catch (e) {
      setIsLoading(false)
      toast('error', 'Failed to delete student. Please try again.');
      console.error(`Exception when deleting student: ${e}`)
    }
  }
  return (
    <>
      <Card style={{ width: "300px" }}>
        <div
          className="parts__image"
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            name={studentFullName(student)}
            size="100"
            textSizeRatio={1.75}
            round={true}
            color="var(--primary-color)"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: "8px" }}>
              {studentFullName(student)}
            </p>

            {student.phone && student.phone!=='N/a' ? 
              <Link 
                to={`https://wa.me/${student.phone}?text=HI%20${student.firstName},%20`}
                target="_blank"
              >
                <Button
                  icon={<BiLogoWhatsapp size={22} />}
                  aria-label="Message"
                  text
                  style={{ alignItems: "flex-start", padding: 0 }}
                />
              </Link> 
              : ''}
          </div>
          <div>
            {userDetails.map((detail, index) => (
              <DetailsContent
                key={index}
                heading={detail.heading}
                paragraph={detail.paragraph}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "20px",
            }}
          >
            <p style={{ fontSize: 16, fontWeight: 500 }}>Outstanding Items</p>
            <div>
              <Button
                onClick={handleClickOpen()}
                icon={<AiOutlinePlus size={22} />}
                text
                style={{ alignItems: "flex-start", padding: 0 }}
              />
              <Button
                onClick={handleClickOpen()}
                icon={<AiOutlineEdit size={22} />}
                text
                style={{ alignItems: "flex-start", padding: 0 }}
              />
            </div>
          </div>
          <div style={{ marginLeft: 15 }}>
            {categories.map((category) => {
              return (
                <div key={category.key} style={{ marginBottom: 15 }}>
                  <Checkbox
                    inputId={category.key}
                    name="category"
                    value={category}
                    checked={selectedCategories.some(
                      (item) => item.key === category.key
                    )}
                    style={{ marginRight: 10 }}
                  />
                  <label htmlFor={category.key} style={{ fontSize: 13 }}>
                    {category.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {user.role !== 'FACILITATOR' ? (<Button
            label="Edit Profile"
            icon="pi pi-user-edit"
            className="p-button-outlined p-button-sm"
            onClick={() => setShowEditStudentDetailsForm(true)}
          />) : ''}

          <Button
            label="Share"
            icon="pi pi-share-alt"
            className="p-button-outlined p-button-sm"
          />
        </div>
        <div          
          style={{
            marginTop: 8,
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ConfirmPopup />
          {user.role === 'ORGANISATION_ADMIN' ? (<Button
            loading={isLoading}
            label="Delete Student"
            icon="pi pi-trash"
            className="p-button-outlined p-button-danger p-button-sm"
            onClick={showDeletePopup}
          />) : ''}

        </div>
        <Dialog
          header={`Edit Student Details`}
          style={{ width: "40vw" }}
          visible={showEditStudentDetailsForm}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          onHide={() => setShowEditStudentDetailsForm(false)}
        > 
          <div> 
            <EditStudentDetailsForm
              formData={updateStudentDetailsFormData}
              setFormData={setUpdateStudentDetailsFormData}
              updateStudentDetails={updateStudentDetails}
              isLoading={isLoading}
            />
          </div>
        </Dialog>
        <Dialog
          header={`Delete student`}
          style={{ width: "40vw" }}
          visible={showDeleteStudentDialog}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          onHide={() => setShowDeleteStudentDialog(false)}
        > 
          <div> 
            Are you sure you want to delete {student.firstName}{student.middleNames ? student.middleNames : ''} {student.lastName}?
          </div>
        </Dialog>

      </Card>
    </>
  );
};

export default Studentcontent;
