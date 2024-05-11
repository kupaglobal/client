import { useState, useContext } from "react";
import { Checkbox } from "primereact/checkbox";
import { TemplatesService } from "../../../services/templates.service";
import { Button } from "primereact/button";
import { toastStore } from "../../../store/toast";
import { templatesStore } from "../../../store/templates";
import { SET_ACTIVE_TEMPLATE } from "../../../store/actions";
import { Tooltip } from "primereact/tooltip";


const Createroute1 = (props) => {
  const [studentFields] = useState([])
  const [selectedFields, setSelectedFields] = useState([]);
  const [createTemplateLoading, setCreateTemplateLoading] = useState(false)
  const { toast } = useContext(toastStore);
  const { dispatch } = useContext(templatesStore);

  // async function fetchStudentFields() {
  //   try {
  //     setCreateTemplateLoading(true)
  //     const { data: studentFieldsRes} = await StudentsService.getStudentFields();
  //     setStudentFields(studentFieldsRes)
  //     setSelectedFields([...studentFieldsRes.filter(studentField => studentField.isRequired)])
  //     setCreateTemplateLoading(false)
  //   } catch (e) {
  //     setCreateTemplateLoading(false)
  //     toast('error',e.response?.data?.error ? e.response?.data?.error : 'Failed to get student fields, please try again.')

  //   }
  // }

  // useEffect(() => {
  //   fetchStudentFields()
  // }, [setStudentFields, setSelectedFields])

  // const [newTemplateName, setNewTemplateName] = useState("");

  const onStudentFieldChange = (e) => {
    let _selectedFields = [...selectedFields];

    if (e.checked) _selectedFields.push(e.value);
    else
      _selectedFields = _selectedFields.filter(
        (selectedField) => selectedField.columnName !== e.value.columnName
      );

    setSelectedFields(_selectedFields);
  };

  const createTemplate = async (e) => {
    try {
      e.preventDefault()
      setCreateTemplateLoading(true)
      const {data: newTemplate} = await TemplatesService.createTemplate({
        name: `${Date.now()}`,
        studentFieldIds: selectedFields.map(selectedField => selectedField.id)
      })
      console.log()
      const {data: template}= await TemplatesService.getTemplateById(newTemplate.id) 
      dispatch({
        type: SET_ACTIVE_TEMPLATE,
        payload: template
      })
      await TemplatesService.downloadTemplate(template);
      if (props.setActiveStep) {
        props.setActiveStep(1)
      }
      if (props.setActiveTemplate) {
        props.setActiveTemplate(template)
      }
      clearForm()
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setCreateTemplateLoading(false)
    }
  }
  const clearForm = () => {
    setCreateTemplateLoading(false)
//    setNewTemplateName("")
    setSelectedFields(studentFields.filter(studentField => studentField.isRequired))
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <form onSubmit={createTemplate}>
        {/* <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <p style={{ fontSize: 13, alignSelf: "center" }}>Template Name :</p>
          <InputText value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} required/>
        </div> */}
        <div>
          

          <p style={{ fontSize: 13, alignSelf: "center" }}>Select Fields you have the data for. <Tooltip target=".custom-target-icon" className="text-sm" /><span className="custom-target-icon text-primary cursor-pointer" data-pr-tooltip="The fields which are uncheckable (e.g First Name, Last Name etc) are mandatory and also used to mark duplicate students in your organisation." data-pr-position="right">Learn More</span></p>
          <div
            style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "10px",
            }}
          >
            {studentFields.length === 0 ? <div>Please wait...</div> : ''}
            {studentFields.map((studentField) => {
              return (
                <div key={studentField.columnName} style={{ marginBottom: 10 }}>
                  <Checkbox
                    inputId={studentField.columnName}
                    name="studentFields"
                    value={studentField}
                    onChange={onStudentFieldChange}
                    checked={selectedFields.some(
                      (item) => item.columnName === studentField.columnName
                    )}
                    disabled={Boolean(studentField.isRequired)}
                    style={{ marginRight: 10 }}
                    required={studentField.isRequired}
                  />
                  <label htmlFor={studentField.columnName} style={{ fontSize: 13 }}>
                    {studentField.displayName}
                  </label>
                </div>
              );
            })}

          </div>
          <div className="mt-5">
            <Button
              label="Download Template & Proceed"
              icon="pi pi-download"
              type="submit"
              className="custom-button"
              disabled={createTemplateLoading}
              loading={createTemplateLoading}
            />
          </div>
        </div>
        </form>
    </div>
  );
};

export default Createroute1;
