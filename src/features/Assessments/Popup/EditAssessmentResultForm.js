import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";

const EditAssessmentResultForm = ({ formData, setFormData, updateAssessmentResult, isLoading, user }) => {
    formData.dateConducted = new Date(formData.dateConducted)
    const userFields = {
        'FACILITATOR': ['feedback'],
        'MEMBER': ['grade', 'score', 'dateConducted', 'feedback'],
        'ORGANISATION_ADMIN': ['grade', 'score', 'dateConducted', 'feedback']
    }
    const userAllowedFields = userFields[user.role] ?? []

    const [error] = useState('')
    formData.dateConducted = new Date(formData.dateConducted)
    const onChange=(e)=>{
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateAssessmentResult()
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            {userAllowedFields.length === 0 ? <div><span className="line-height-3 text-red-500 mb-3">You are not allowed to edit any fields here.</span></div> : null}

            <div className="mb-10">
                {formData.grade ? (
                    <>
                        <label htmlFor="grade" className={`block mb-20 ${userAllowedFields.includes('dateConducted') ? 'text-900' : 'text-200'}`}>Grade</label>
                        <InputText name="grade" id="grade" type="text" placeholder="" className="w-full mb-3" value={formData.grade} onChange={onChange} required disabled={!userAllowedFields.includes('grade')}/>
                    </>
                ) : ''}
            
                {formData.score ? (
                    <>
                        <label htmlFor="score" className={`block mb-20 ${userAllowedFields.includes('dateConducted') ? 'text-900' : 'text-200'}`}>Score</label>
                        <InputText name="score" id="score" type="number" placeholder="" className="w-full mb-3" value={formData.score} onChange={onChange} required disabled={!userAllowedFields.includes('score')}/>
                    </>
                ) : ''}
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </div>
            <div className="mb-10">
                <label htmlFor="feedback" className={`block mb-20 ${userAllowedFields.includes('feedback') ? 'text-900' : 'text-200'}`}>Feedback</label>
                <InputTextarea value={formData.feedback} name="feedback" onChange={onChange} rows={5} cols={45} disabled={!userAllowedFields.includes('feedback')} />
            </div>

            <div className="my-4">
                <label htmlFor="feedback" className={`block mb-20 ${userAllowedFields.includes('dateConducted') ? 'text-900' : 'text-200'}`}>Date Conducted</label>
                <Calendar value={formData.dateConducted} name="dateConducted" onChange={onChange} dateFormat="yy-mm-dd" required disabled={!userAllowedFields.includes('dateConducted')} />
            </div>
            <Button
                label="Edit Assessment Result"
                icon="pi pi-pencil"
                type="submit"
                className="custom-button"
                loading={isLoading}
            />

        </form>
    </div>
    );
};

export default EditAssessmentResultForm;
