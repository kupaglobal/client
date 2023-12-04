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
import { InputText } from "primereact/inputtext";
import { AssessmentsService } from "../../../services/assessments.service";
        
export default function Popupcontent({ onReload }) {
  const { state, dispatch } = useContext(studentsStore)
  const {showAddStudentsPopup, showErroredStudentsPopup, reloadStudents, selectedStudents} = state
  const [createAssessmentVisibility, setCreateAssessmentVisibility] = useState(false)
  const { toast } = useContext(toastStore);
  const [selectedType, setSelectedType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    if (reloadStudents) {
      onReload()
      dispatch({
        type: RELOAD,
        payload: false
      })
    }
  }, [reloadStudents, dispatch, onReload])

  const footerContent = (
    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setCreateAssessmentVisibility(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Create Assessment"
        icon="pi pi-book"
        onClick={() => createAssessment(false)}
        className="custom-button"
        outlined
        loading={isLoading}
      />
    </div>
  );
  // const [selectedOption, setSelectedOption] = useState("");
  const [projectOptions] = useState([
    { name: "Score (e.g. 70%)", code: 'score' },
    { name: "Grade (e.g. A, B)",  code: 'grade' },
  ]);

  // const handleOptionSelect = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const createAssessment = async () => {
    setIsLoading(true)
    formData.type = selectedType.code

    try {
      await AssessmentsService.createAssessments(formData)
      setCreateAssessmentVisibility(false)
      setIsLoading(false)
      toast('success', 'Assessment Created successfully')
      onReload()
    } catch (e) {
      toast('error',e.response?.data?.message ? e.response?.data?.message : e.message)
      setIsLoading(false)
    }
  }
  const [formData,setFormData]=useState({
    "name": "",
    "type": ""
  })


  const onChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <>
      <Button
        outlined
        icon={<AiOutlinePlus />}
        label="Add Assessment"
        className="custom-button"
        onClick={() => setCreateAssessmentVisibility(true)}
      />
      <Dialog
        header="Create a new Assessment"
        visible={createAssessmentVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setCreateAssessmentVisibility(false)}
        footer={footerContent}
      >
        <div>
        <form>
            <label htmlFor="name" className="block text-900 font-medium mb-20">Name</label>
            <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" onChange={onChange} required/>

            <p style={{ fontSize: "13px" }}>
              Select the type for this assessment
            </p>
            <Dropdowncomp
              projectoption={projectOptions}
              onSelected={setSelectedType}
            />
        </form>
        </div>

      </Dialog>
    </>
  );
}
