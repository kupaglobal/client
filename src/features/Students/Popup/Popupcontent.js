import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiOutlinePlus } from "react-icons/ai";
import Dropdowncomp from "../../../components/Dropdown";
import Templatetab from "./Templatetab";
import { useContext, useEffect, useState } from "react";
import { RELOAD, SHOW_ADD_STUDENTS_POPUP } from "../../../store/actions";
import { studentsStore } from "../../../store/students";
        
export default function Popupcontent({ onReload }) {
  const { state, dispatch } = useContext(studentsStore)
  const {showAddStudentsPopup: visible, reloadStudents} = state

  const setVisibility = (visibility) => {
    dispatch({
      type: SHOW_ADD_STUDENTS_POPUP,
      payload: visibility
    })
  } 

  useEffect(() => {
    if (reloadStudents) {
      onReload()
      dispatch({
        type: RELOAD,
        payload: false
      })
    }
  }, [reloadStudents])
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
      <Button
        outlined
        icon={<AiOutlinePlus />}
        label="Add new student"
        className="custom-button"
        onClick={() => setVisibility(true)}
      />

      <Dialog
        header="New student data"
        visible={visible}
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
    </>
  );
}
