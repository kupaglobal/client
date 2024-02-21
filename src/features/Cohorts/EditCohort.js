import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { CohortsService } from "../../services/cohorts.service";
import { toastStore } from "../../store/toast";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";

const EditCohortForm = ({ cohort, formData, setFormData }) => {
    const { toast } = useContext(toastStore)
    const [error] = useState('')
    const [dates, setDates] = useState([new Date(formData.startDate), new Date(formData.endDate)]);
    const [isLoading, setIsLoading] = useState(false);

    const onChange=(e)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        try {
            await CohortsService.editCohort(cohort.id, {
                name: formData.name,
                startDate: dates[0],
                endDate: dates[1] 
            })
            toast('success', 'Cohort was successfully edited.')
            window.location.href = '/students?a=Cohorts'
            setIsLoading(false)
        } catch (e) {
            toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
            setIsLoading(false)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <div className="mb-10">
                <label htmlFor="name" className="block text-900 font-medium mb-20">Cohort Name</label>
                <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" value={formData.name} onChange={onChange} required/>
            
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </div>
            <div className="card flex my-4">
                <span className="p-float-label">
                    <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" dateFormat="dd/mm/yy" required />
                    <label htmlFor="birth_date">Start - End Dates</label>
                </span>
            </div>
            <Button
                label="Edit Cohort"
                icon="pi pi-users"
                type="submit"
                className="custom-button"
                disabled={!formData.name}
                loading={isLoading}
            />

        </form>
    </div>
    );
};

export default EditCohortForm;
