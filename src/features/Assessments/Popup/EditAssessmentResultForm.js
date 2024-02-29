import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";

const EditAssessmentResultForm = ({ formData: assessmentResult, updateAssessmentResult, isLoading, user }) => {
    const [formData, setFormData] = useState({
        grade: assessmentResult.assessment.type === 'grade' ? assessmentResult.grade : null,
        score: assessmentResult.assessment.type === 'score' ? assessmentResult.score : null,
        feedback: assessmentResult.feedback,
        dateConducted: new Date(assessmentResult.dateConducted),
        assessment: assessmentResult.assessment
    })

    const userFields = {
        'FACILITATOR': ['feedback'],
        'MEMBER': ['grade', 'score', 'dateConducted', 'feedback'],
        'ORGANISATION_ADMIN': ['grade', 'score', 'dateConducted', 'feedback']
    }
    const userAllowedFields = userFields[user.role] ?? []

    const [error] = useState('')
    const onChange=(e)=>{
      setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value,
      })
    }

    const [dateConducted, setDateConducted] = useState(new Date(assessmentResult.dateConducted))
    const [feedback, setFeedback] = useState(assessmentResult.feedback)

    // const setDateConducted = (date) => {
    //     formData.dateConducted = date
    //     setFormData(formData)
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateAssessmentResult({
            ...formData,
            dateConducted
        })
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            {userAllowedFields.length === 0 ? <div><span className="line-height-3 text-red-500 mb-3">You are not allowed to edit any fields here.</span></div> : null}

            <div className="mb-10">
                {formData.assessment.type === 'grade' ? (
                    <>
                        <label htmlFor="grade" className={`block mb-20 ${userAllowedFields.includes('dateConducted') ? 'text-900' : 'text-200'}`}>Grade</label>
                        <InputText name="grade" id="grade" type="text" placeholder="e.g A/B/C or Pass/Fail" className="w-full mb-3" value={formData.grade} onChange={onChange} required disabled={!userAllowedFields.includes('grade')}/>
                    </>
                ) : ''}
            
                {formData.assessment.type === 'score' ? (
                    <>
                        <label htmlFor="score" className={`block mb-20 ${userAllowedFields.includes('dateConducted') ? 'text-900' : 'text-200'}`}>Score (%)</label>
                        <InputText name="score" id="score" type="number" placeholder="e.g 90" className="w-full mb-3" value={formData.score} onChange={onChange} required disabled={!userAllowedFields.includes('score')}/>
                    </>
                ) : ''}
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </div>
            <div className="mb-10">
                <label htmlFor="feedback" className={`block mb-20 ${userAllowedFields.includes('feedback') ? 'text-900' : 'text-200'}`}>Feedback</label>
                <InputTextarea value={formData.feedback} className="p-2 w-full" name="feedback" onChange={onChange} rows={5} disabled={!userAllowedFields.includes('feedback')} />
            </div>

            <div className="my-4">
                <label htmlFor="feedback" className={`block mb-20 ${userAllowedFields.includes('dateConducted') ? 'text-900' : 'text-200'}`}>Date Conducted</label>
                <Calendar value={formData.dateConducted} name="dateConducted" onChange={onChange} required disabled={!userAllowedFields.includes('dateConducted')} />
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