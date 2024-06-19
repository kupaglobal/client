import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import Dropdowncomp from "../../../components/Dropdown";
import Templatetab from "./Templatetab";
import ErroredStudents from "./ErroredStudents";
import { useContext, useEffect, useState } from "react";
import { HIDE_ERRORED_STUDENTS_POPUP, RELOAD, SHOW_ADD_STUDENTS_POPUP } from "../../../store/actions";
import { studentsStore } from "../../../store/students";
import { TagsService } from "../../../services/tags.service";
import { toastStore } from "../../../store/toast";
import { HttpStatusCode } from "axios";
import { CohortsService } from "../../../services/cohorts.service";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { StudentsService } from "../../../services/students.service";
import { Dropdown } from "primereact/dropdown";
        
export default function Popupcontent({ onReload, loggedInUser, currentCohort }) {

  const { state, dispatch } = useContext(studentsStore)
  const {showAddStudentsPopup, showErroredStudentsPopup, reloadStudents, selectedStudents} = state
  const [addToTagVisibility, setAddToTagVisibility] = useState(false)
  const [addToCohortVisibility, setAddToCohortVisibility] = useState(false)
  const { toast } = useContext(toastStore);
  const [tags, setTags] = useState([])
  const [cohorts, setCohorts] = useState([])
  // const [selectedTag, setSelectedTag] = useState(null)
  const [selectedTagId, setSelectedTagId] = useState('')
  const [selectedCohort, setSelectedCohort] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e) => {
    setSelectedTagId(e.value);
    // const tag = tags.filter(tag => tag.id === e.value)[0];
    // setSelectedTag(tag)
  }

  const addSelectedStudentsToTag = async () => {
    try {
      const res = await TagsService.addStudentsToTag(selectedStudents.map(selectedStudent => selectedStudent.id), selectedTagId)
      if (res.status === HttpStatusCode.Ok || res.status === HttpStatusCode.Created) {
        toast('success', `${selectedStudents.length} Students were tagged.`)
        setAddToTagVisibility(false)
        onReload()
      } else {
        console.log(res)
        toast('error', res.response?.data?.message)
      }
    } catch (e) {
      console.log(e)
      toast('error', 'Failed to add students to the tag. Please try again.')
    }
  } 

  const addSelectedStudentsToCohort = async () => {
    try {
      const res = await CohortsService.addStudentsToCohort(selectedStudents.map(selectedStudent => selectedStudent.id), selectedCohort.id)
      if (res.status === HttpStatusCode.Created) {
        toast('success', `${selectedStudents.length} Students were added to the cohort: ${selectedCohort.name}`)
        setAddToCohortVisibility(false)
        onReload()
      } else {
        console.log(res)
        toast('error', res.response?.data?.message ?? 'Something went wrong, please try again.')
      }
    } catch (e) {
      console.log(e)
      toast('error', 'Failed to add students to the cohort. Please try again.')
    }
  } 

  const setVisibility = (visibility) => {
    dispatch({
      type: SHOW_ADD_STUDENTS_POPUP,
      payload: visibility
    })
    dispatch({
      type: HIDE_ERRORED_STUDENTS_POPUP,
      payload: visibility
    })
  } 

  const [shouldRetry, setShouldRetry] = useState(true)
  useEffect(() => {
    async function fetchTags() {
      try {
        const {data: tagsRes} = await TagsService.getTags()
        const tags = tagsRes.tags.map(tmpTag => { 
          const selectedStudentsInTag = selectedStudents.filter(selectedStudent => selectedStudent.tags.map(tag => tag.name).includes(tmpTag.name)) ?? []; 
          return {
            ...tmpTag, 
            isSelected: false,
            name: selectedStudentsInTag.length > 0 ? `${tmpTag.name} (Already in: ${selectedStudentsInTag.map(s => s.firstName).join(", ")})` : tmpTag.name
          }
        })
        setTags(tags)
      } catch (e) {
        setShouldRetry(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }

    async function fetchCohorts() {
      try {
        const {data: cohortsRes} = await CohortsService.getCohorts()
        const cohorts = cohortsRes.cohorts.map(cohort => ({ ...cohort, isSelected: false }))
        setCohorts(cohorts)
      } catch (e) {
        setShouldRetry(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }

    if (shouldRetry) {
      fetchTags()
      fetchCohorts()
    }
  }, [toast, shouldRetry, selectedStudents])

  useEffect(() => {
    if (reloadStudents) {
      onReload()
      dispatch({
        type: RELOAD,
        payload: false
      })
    }
  }, [reloadStudents, dispatch, onReload, shouldRetry])

  const showDeletePopup = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to delete the selected students?`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: deleteStudents,
      reject: () => {}
    });        
  }

  const showRemoveFromCohortPopup = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to remove the selected students from ${currentCohort.name} Cohort?`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: removeStudentsFromCohort,
      reject: () => {}
    });        
  }

  const deleteStudents = async () => {
    setIsLoading(true) 
    try {
      await StudentsService.deleteStudents(selectedStudents.map(student => student.id))
      toast('success', 'Students have been deleted.')
      setIsLoading(false) 
      onReload()
      dispatch({
        type: RELOAD,
        payload: false
      })
    } catch (e) {
      console.error(e, `Exception when deleting students, e: ${e}`)
      toast('error', 'Failed to delete the students. Please try again.')
      setIsLoading(false) 
    }
  }

  const removeStudentsFromCohort = async () => {
    setIsLoading(true) 
    try {
      await CohortsService.removeStudentsFromCohort(selectedStudents.map(student => student.id), currentCohort.id)
      toast('success', 'Students have been removed from cohort.')
      setIsLoading(false) 
      onReload()
      dispatch({
        type: RELOAD,
        payload: false
      })
    } catch (e) {
      console.error(e, `Exception when removing students from cohort ${currentCohort.id}, e: ${e}`)
      toast('error', `Failed to remove students from cohort. Please try again.`)
      setIsLoading(false) 
    }
  }

  const footerContent = (
    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisibility(false)}
        className="custom-button"
        outlined
      />
      {/* <Button
        label="Submit"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        className="custom-button"
        disabled
      /> */}
    </div>
  );
  const addToTagFooterContent = (
    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setAddToTagVisibility(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Add Tag"
        icon="pi pi-user-plus"
        onClick={() => addSelectedStudentsToTag()}
        className="custom-button"
        disabled={!selectedTagId}
      />
    </div>
  );
  const addToCohortFooterContent = (

    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setAddToCohortVisibility(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Add to Cohort"
        icon="pi pi-user-plus"
        onClick={() => addSelectedStudentsToCohort()}
        className="custom-button"
        disabled={!selectedCohort}
      />
    </div>
  );
  // const [selectedOption, setSelectedOption] = useState("");
  const [projectOptions] = useState([
    { name: "Via template", code: 'VT' },
    { name: "Manual Input",  code: 'MI' },
  ]);

  // const handleOptionSelect = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <>
      <div id="buttons">
        {selectedStudents.length > 0 ? 
          <div>
            <Button
              outlined
              icon={<AiOutlinePlus />}
              label="Tag Students"
              className="custom-button mx-2"
              onClick={() => setAddToTagVisibility(true)}
            />
            <Button
              icon={<AiOutlinePlus />}
              label="Add Students To Cohort"
              className="custom-button mx-2"
              onClick={() => setAddToCohortVisibility(true)}
            />

            <ConfirmPopup/>
            {loggedInUser.role === 'ORGANISATION_ADMIN' ? 
            <>
              {currentCohort ? 
                <Button
                  loading={isLoading}
                  outlined
                  icon={<AiOutlineDelete />}
                  label="Remove from Cohort"
                  className="p-button-danger custom-button mx-2"
                  onClick={showRemoveFromCohortPopup}
                /> 
                :
                null
              }
              <Button
                loading={isLoading}
                outlined
                icon={<AiOutlineDelete />}
                label="Delete"
                className="p-button-danger custom-button mx-2"
                onClick={showDeletePopup}
              />
            </>
            : ''}
          </div>
          :       <Button
          outlined
          icon={<AiOutlinePlus />}
          label="Add Students"
          className="custom-button"
          onClick={() => setVisibility(true)}
        />
  
        }
      </div>
       
      <Dialog
        header="Tag Selected Students"
        visible={addToTagVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setAddToTagVisibility(false)}
        footer={addToTagFooterContent}
      >
        <div>
          <p style={{ fontSize: "13px" }}>
            Select or type a new tag:
          </p>
          <Dropdown
            name="tag"
            editable
            value={selectedTagId}
            onChange={onChange}
            options={tags}
            optionLabel="name" 
            optionValue="id"
            placeholder={`Select a tag`}
            className="w-full mb-3 "
          />
          {/* <Dropdowncomp
            projectoption={tags}
            onSelected={setSelectedTag}
          /> */}
        </div>

      </Dialog>
      <Dialog
        header="Add Selected Students to Cohort"
        visible={addToCohortVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setAddToCohortVisibility(false)}
        footer={addToCohortFooterContent}
      >
        <div>
          <p style={{ fontSize: "13px" }}>
            Select a cohort to add the students to
          </p>
          <Dropdowncomp
            projectoption={cohorts}
            onSelected={setSelectedCohort}
          />
        </div>

      </Dialog>

      <Dialog
        header="New student data"
        visible={showAddStudentsPopup}
        style={{ width: "60vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisibility(false)}
        footer={footerContent}
      >

        <div>
          <p style={{ fontSize: "13px" }}>
            Are you sure you want to add the new data ?
          </p>
          <Dropdowncomp
            projectoption={projectOptions}
          />
        </div>

        <div>
          <Templatetab />
        </div>
      </Dialog>

      <Dialog
        header="Errored student data"
        visible={showErroredStudentsPopup}
        style={{ width: "60vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisibility(false)}
        footer={footerContent}
      >
        <div>
          <ErroredStudents />
        </div>
      </Dialog>


    </>
  );
}
