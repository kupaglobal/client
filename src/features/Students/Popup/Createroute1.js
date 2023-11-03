import { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { StudentsService } from "../../../services/students.service"
import { TemplatesService } from "../../../services/templates.service";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { toastStore } from "../../../store/toast";


const Createroute1 = (props) => {
  const [studentFields, setStudentFields] = useState([])
  const [selectedFields, setSelectedFields] = useState([]);
  const [createTemplateLoading, setCreateTemplateLoading] = useState(false)
  const { toast } = useContext(toastStore);

  async function fetchStudentFields() {
    const { data: studentFieldsRes} = await StudentsService.getStudentFields();
    setStudentFields(studentFieldsRes)
    setSelectedFields([...studentFieldsRes.filter(studentField => studentField.isRequired)])
  }

  useEffect(() => {
    fetchStudentFields()
  }, [setStudentFields, setSelectedFields])

  const [newTemplateName, setNewTemplateName] = useState("");

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
        name: newTemplateName,
        studentFieldIds: selectedFields.map(selectedField => selectedField.id)
      })
      if (props.setActiveStep) {
        props.setActiveStep(1)
      }
      if (props.setActiveTemplate) {
        props.setActiveTemplate(newTemplate)
      }
      clearForm()
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setCreateTemplateLoading(false)
    }
  }
  const clearForm = () => {
    setCreateTemplateLoading(false)
    setNewTemplateName("")
    setSelectedFields(studentFields.filter(studentField => studentField.isRequired))
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <form onSubmit={createTemplate}>
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <p style={{ fontSize: 13, alignSelf: "center" }}>Template Name :</p>
          <InputText value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} required/>
        </div>
        <div>
          <p style={{ fontSize: 13, alignSelf: "center" }}>Select Fields</p>
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
              label="Create Template"
              icon="pi pi-plus"
              type="submit"
              className="custom-button"
              loading={createTemplateLoading}
            />
          </div>
        </div>
        </form>
    </div>
  );
};

export default Createroute1;
