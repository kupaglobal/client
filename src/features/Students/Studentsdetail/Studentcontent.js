import React, { useContext, useRef } from "react";
import Avatar from "react-avatar";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Card } from "primereact/card";
import DetailsContent from "../../../components/DetailsContent";
import { BiLogoWhatsapp } from "react-icons/bi";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Link } from "react-router-dom";
import EditStudentDetailsForm from "./EditStudentDetailsForm";
import { Dialog } from "primereact/dialog";
import { StudentsService } from "../../../services/students.service";
import { studentFullName, studentName } from "../../../utils";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { toastStore } from "../../../store/toast";
import { Tag } from "primereact/tag";
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputTextarea } from "primereact/inputtextarea";
import { CohortsService } from "../../../services/cohorts.service";
import { Dropdown } from "primereact/dropdown";

const Studentcontent = ({ student, setStudent, user, reloadStudent }) => {

  const userCategories = {
    'FACILITATOR': [
      { name: "Review assessment", key: "RA", selected: false },
      { name: user.role === 'FACILITATOR' ? "Add feedback" : "Request for feedback", key: "RCE", selected: student.feedback.filter(feedback => feedback.facilitatorId === user.id).length > 0, onClick: (e) => op.current.toggle(e) },
    ],
    'ORGANISATION_ADMIN': [
      { name: "Review assessment", key: "RA", selected: false },
      { name: "Submit portfolio files", key: "SPF", selected: false },
      { name: "Request for feedback", key: "RCE", selected: false },
    ],
    'ORGANISATION_MEMBER': [
      { name: "Review assessment", key: "RA", selected: false },
      { name: "Submit portfolio files", key: "SPF", selected: false },
      { name: "Request for feedback", key: "RCE", selected: true },
    ]
  }
  const categories = userCategories[user.role];

  const [selectedCategories] = useState(categories.filter(category => category.selected));
  const userDetails = [
    { heading: "Student Number", paragraph: student.studentNumber },
    { heading: "Year of Birth", paragraph: student.yearOfBirth },
    { heading: "Gender", paragraph: student.gender },
    { heading: "Cohort", paragraph: student.cohorts?.map(cohort => cohort.name).join(', ') },
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
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedCohortId, setSelectedCohortId] = useState(student.cohorts.length === 1 ? student.cohorts[0].id : '')

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

  const saveFeedback = async () => {
    setIsLoading(true)

    try {
      await CohortsService.addStudentFeedback(selectedCohortId, feedbackFormData);
      toast('success', 'Student feedback has been added.');
      setIsLoading(false)
      reloadStudent()
    } catch (e) {
      setIsLoading(false)
      toast('error', 'Failed to save student rating. Please try again.');
      console.error(`Exception when deleting student: ${e}`)
    }
  }

  // const studentTags = async (tags) => {
  //   <Tag value={tags[0].name} icon="pi pi-times" className="mr-1" key={tags[0].id} /> 
  // }

  const op = useRef(null);

  const [feedbackFormData, setFeedBackFormData] = useState({
    studentId: student.id,
    rating: '',
    remarks: ''
  })
  const setRating = (rating) => {
    setSelectedRating(rating)
    setFeedBackFormData({
      ...feedbackFormData,
      rating
    })
  }
  const onChange = (e) => {
    setFeedBackFormData({ 
      ...feedbackFormData,
      [e.target.name]: e.target.value
    })
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
              {studentName(student)}
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              {student.tags?.map(tag => <Tag value={tag.name} className="mr-1 mt-1" key={tag.id} /> )}
            </p>
          </div>
          <div>
            {userDetails?.map((detail, index) => (
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
              marginBottom: "20px",
            }}
          >
            <p style={{ fontSize: 16, fontWeight: 500 }}>Outstanding Items</p>
            {/* <div>
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
            </div> */}
          </div>
          <div style={{ marginLeft: 15 }}>
            {categories?.map((category) => {
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
            flexDirection: "column",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {user.role !== 'FACILITATOR' ? (
          <>
          <Button
            label="Edit Profile"
            icon="pi pi-user-edit"
            className="p-button-outlined p-button-sm"
            onClick={() => setShowEditStudentDetailsForm(true)}
          />          


          </>) : ''}

          {/* <Button
            label="Share"
            icon="pi pi-share-alt"
            className="p-button-outlined p-button-sm"
          /> */}
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
          {user.role === 'FACILITATOR' && student.cohorts.length > 0 ? (<>
            <Button type="button" icon="pi pi-star" className="p-button-sm my-1" label="Add Feedback" onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op} className="md:w-21rem bg-bluegray-100 p-2">
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>Give your feedback below</p>

              <div className="mt-1 text-xs mb-4" style={{ display: "flex", justifyContent: "space-between" }}>
                <Button icon="pi pi-star" onClick={() => setRating('STAR')} className={`${selectedRating === 'STAR' ? '' : 'p-button-outlined'} p-button-primary`}  />
                <Button icon="pi pi-thumbs-up" onClick={() => setRating('THUMBS_UP')} className={`${selectedRating === 'THUMBS_UP' ? '' : 'p-button-outlined'} p-button-primary`} />
                <Button icon="pi pi-thumbs-down" onClick={() => setRating('THUMBS_DOWN')} className={`${selectedRating === 'THUMBS_DOWN' ? '' : 'p-button-outlined'} p-button-primary`} />
              </div>

              <div className="my-2">
                <label htmlFor="feedback" className="block mb-20">Select a cohort</label>
                <Dropdown scrollHeight="260px" value={selectedCohortId} onChange={(e) => setSelectedCohortId(e.target.value)} options={student.cohorts}
                  placeholder="Select a cohort" className="w-full h-max" optionLabel="name" optionValue="id" />
              </div>

              <div className="mb-10">
                <label htmlFor="feedback" className="block mb-20">Remarks (Optional) </label>
                <InputTextarea value={feedbackFormData.remarks} className="p-2 w-full" name="remarks" onChange={onChange} rows={7} />
              </div>
              <Button type="button" loading={isLoading} className="p-button-sm my-1" label="Save" onClick={saveFeedback} disabled={!selectedCohortId || !selectedRating}  />
            </OverlayPanel>

          </>) : null}
          {user.role === 'ORGANISATION_ADMIN' ? (<Button
            loading={isLoading}
            label="Delete Student"
            icon="pi pi-trash"
            className="p-button-outlined w-full p-button-danger p-button-sm"
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
