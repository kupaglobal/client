import React, {useEffect, useState} from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { StudentsService } from "../../../services/students.service";
import { SelectButton } from "primereact/selectbutton";

const EditStudentDetailsForm = ({ formData, setFormData, updateStudentDetails, isLoading }) => {
    const [error, setError] = useState()
    const onChange=(e)=>{
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setFormData({...formData, skillGained: '' })
        await updateStudentDetails()
    }

    const [studentFields, setStudentFields] = useState([])
    async function fetchStudentFields() {
        const { data: studentFieldsRes} = await StudentsService.getStudentFields();
        setStudentFields(studentFieldsRes)
    }
    
    useEffect(() => {
        fetchStudentFields()
    }, [setStudentFields])

    const createStudentField = (studentField) => {
        switch(studentField.type) {
            case 'radio': 
                return <>
                    <SelectButton
                        key={studentField.id}
                        value={formData[studentField.columnName]} 
                        onChange={onChange}
                        optionLabel={studentField.displayName}
                        options={studentField.values ?? []}
                        required={studentField.isRequired}
                    />
                </>
            
            default: 
                return <>
                    <label htmlFor={studentField.columnName} className="block text-900 font-medium mb-20">{studentField.displayName}</label>
                    <InputText
                        key={studentField.id}
                        value={formData[studentField.columnName]}
                        name={studentField.columnName}
                        id={studentField.columnName}
                        type={studentField.type}
                        placeholder="" className="w-full mb-3"
                        onChange={onChange}
                        required={studentField.isRequired}
                    />
                </>
        }
    } 

    const formLeftSide = studentFields.filter((field, index) => index < Math.ceil(studentFields.length/2)).map(studentField => createStudentField(studentField))

    const formRightSide = studentFields.filter((field, index) => index >= Math.ceil(studentFields.length/2)).map(studentField => createStudentField(studentField))

    return (
        <div className="w-full m-auto m-2">
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", justifyContent: "normal", gap: "8em" }}>
                    <div style={{ width: "40%"}}>
                        {formLeftSide}
                    </div>
                    <div style={{ width: "40%"}}>
                        {formRightSide}
                    </div>

                </div>
            
                <Button
                    label="Save Changes"
                    icon="pi pi-image"
                    type="submit"
                    className="custom-button"
                    loading={isLoading}
                />
    
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </form>
        </div>
    );
};

export default EditStudentDetailsForm;
