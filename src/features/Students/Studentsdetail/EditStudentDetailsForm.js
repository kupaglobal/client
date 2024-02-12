import React, {useEffect, useState} from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { StudentsService } from "../../../services/students.service";
import { SelectButton } from "primereact/selectbutton";
import { TabView, TabPanel } from "primereact/tabview";
import { Tag } from "primereact/tag";

const EditStudentDetailsForm = ({ formData, setFormData, updateStudentDetails, isLoading }) => {
    const [error, setError] = useState()
    const onChange=(e)=>{
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const handleSaveChanges = async () => {
        setError('')
        studentFields.filter(field => field.isArray).forEach(field => {
            formData[field.columnName] = field.selected            
        })
        setFormData({
            ...formData,
        })
        await updateStudentDetails()
    }

    const [studentFields, setStudentFields] = useState([])
    
    useEffect(() => {
        async function fetchStudentFields() {
            const { data: studentFieldsRes} = await StudentsService.getStudentFields();
            setStudentFields(studentFieldsRes.map(studentField => {
                studentField.selected = studentField.isArray && formData[studentField.columnName] ? formData[studentField.columnName] : null;
                return studentField;
            }))
        }
    
        fetchStudentFields()
    }, [setStudentFields, formData])

    const handleEnterKey = async (event, studentField) => {
        const field = studentField.columnName;
        if (event.key === "Enter" && studentField.isArray) {
            setStudentFields(
                studentFields.map(studentField => {
                    if (studentField.columnName === field) {
                        studentField.selected = [...new Set([...studentField.selected, formData[field]])]
                    }
                    return studentField;
                })
            )

            setFormData({ ...formData, [field]: ''})
        }
    }

    const removeItem = async (removedItem, fieldColumnName) => {
        const studentField = studentFields.filter(studentField => studentField.columnName === fieldColumnName)[0] ?? null;
        if (studentField) {
            const remainingItems = studentField.selected.filter(item => item !== removedItem)

            setStudentFields(
                studentFields.map(studentField => {
                    if (studentField.columnName === fieldColumnName) {
                        studentField.selected = remainingItems
                    }
                    return studentField;
                })
            )
        }
    }

    const createStudentField = (studentField) => {
        switch(studentField.type) {
            case 'radio':
                return <>
                    <div className="card justify-content-center mb-4" key={studentField.id}>
                        <label htmlFor={studentField.columnName} className="block text-900 font-medium mb-20">{studentField.displayName}</label>
                        <SelectButton
                            name={studentField.columnName}
                            value={formData[studentField.columnName]}
                            onChange={onChange}
                            options={studentField.values ? studentField.values : ['Yes', 'No']}
                            required={studentField.isRequired}
                        />
                        {/* <SelectButton
                            key={studentField.id}
                            value={formData[studentField.columnName]} 
                            onChange={onChange}
                            optionLabel={studentField.displayName}
                            options={studentField.values ?? []}
                            required={studentField.isRequired}
                        /> */}
                    </div>
                </>
            
            default: 
                return <div key={studentField.id} className="mb-2">
                    <label htmlFor={studentField.columnName} className="block text-900 font-medium mb-20">{studentField.displayName}</label>
                    <InputText
                        key={studentField.id}
                        value={formData[studentField.columnName]}
                        name={studentField.columnName}
                        id={studentField.columnName}
                        type={studentField.type}
                        placeholder={studentField.isArray ? `Enter individual ${studentField.columnName} and press enter` : ''}
                        className="w-full mb-2"
                        onChange={onChange}
                        required={studentField.isRequired}
                        onKeyUp={(e) => handleEnterKey(e, studentField)}
                    />
                    {studentField.isArray && studentField.selected?.length > 0 ?
                        <div className="flex flex-row">
                            {studentField.selected.map((item) => <Tag value={item} icon="pi pi-times" className="mr-1" key={item} onClick={() => removeItem(item, studentField.columnName)}></Tag>)}
                        </div>
                    : null}
                </div>
        }
    } 

    const formLeftSide = studentFields
                            .filter(field => 
                                !field.columnName.toLowerCase().includes('consent') &&
                                !field.columnName.toLowerCase().includes('guardian')
                            )
                            .map(studentField => createStudentField(studentField))

    const formRightSide = studentFields
                            .filter(field => 
                                field.columnName.toLowerCase().includes('consent') || 
                                field.columnName.toLowerCase().includes('guardian')
                            )
                            .map(studentField => createStudentField(studentField))

    return (
        <div className="w-full m-auto m-2">
            <form onSubmit={handleSubmit}>
                <TabView>
                    <TabPanel header="Student" style={{ fontSize: "13px" }}>
                        {formLeftSide}
                    </TabPanel>

                    <TabPanel header="Guardian & Consent" style={{ fontSize: "13px" }}>
                        {formRightSide}
                    </TabPanel>
                </TabView>
            
                <Button
                    label="Save Changes"
                    icon="pi pi-image"
                    type="button"
                    className="custom-button"
                    onClick={() => handleSaveChanges()}
                    loading={isLoading}
                />
    
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </form>
        </div>
    );
};

export default EditStudentDetailsForm;
