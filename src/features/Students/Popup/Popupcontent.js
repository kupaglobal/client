import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiOutlinePlus } from "react-icons/ai";
import Dropdowncomp from "../../../components/Dropdown";
import Templatetab from "./Templatetab";
import ErroredStudents from "./ErroredStudents";
import { useContext, useEffect, useState } from "react";
import { HIDE_ERRORED_STUDENTS_POPUP, RELOAD, SHOW_ADD_STUDENTS_POPUP } from "../../../store/actions";
import { studentsStore } from "../../../store/students";
import { GroupsService } from "../../../services/groups.service";
import { toastStore } from "../../../store/toast";
        
export default function Popupcontent({ onReload }) {
  const { state, dispatch } = useContext(studentsStore)
  const {showAddStudentsPopup, showErroredStudentsPopup, reloadStudents, selectedStudents} = state
  const [addToGroupVisibility, setAddToGroupVisibility] = useState(false)
  const { toast } = useContext(toastStore);
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')

  const addSelectedStudentsToGroup = async () => {
    await GroupsService.addStudentsToGroup(selectedStudents.map(selectedStudent => selectedStudent.id), selectedGroup.id)
    setAddToGroupVisibility(false)
    toast('success', `${selectedStudents.length} Students were added to the group: ${selectedGroup.name}`)
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
    async function fetchGroups() {
      try {
        const {data: groupsRes} = await GroupsService.getGroups()
        const groups = groupsRes.groups.map(group => ({ ...group, isSelected: false }))
        setGroups(groups)
      } catch (e) {
        setShouldRetry(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }

    if (shouldRetry) {
      fetchGroups()
    }
  }, [toast, shouldRetry])

  useEffect(() => {
    if (reloadStudents) {
      onReload()
      dispatch({
        type: RELOAD,
        payload: false
      })
    }
  }, [reloadStudents, dispatch, onReload, shouldRetry])
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
  const addToGroupFooterContent = (

    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setAddToGroupVisibility(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Add to group"
        icon="pi pi-user-plus"
        onClick={() => addSelectedStudentsToGroup()}
        className="custom-button"
        disabled={!selectedGroup}
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
      {selectedStudents.length > 0 ? <Button
        outlined
        icon={<AiOutlinePlus />}
        label="Add Students To Group"
        className="custom-button mx-2"
        onClick={() => setAddToGroupVisibility(true)}
      /> : selectedStudents}
       
      <Button
        outlined
        icon={<AiOutlinePlus />}
        label="Add Students"
        className="custom-button"
        onClick={() => setVisibility(true)}
      />
      <Dialog
        header="Add Students to Group"
        visible={addToGroupVisibility}
        style={{ width: "60vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setAddToGroupVisibility(false)}
        footer={addToGroupFooterContent}
      >
        <div>
          <p style={{ fontSize: "13px" }}>
            Select a group to add the students to
          </p>
          <Dropdowncomp
            projectoption={groups}
            onSelected={setSelectedGroup}
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
            How do you want to add the new data ?
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
