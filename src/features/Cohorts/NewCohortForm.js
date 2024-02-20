import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { GroupsService } from "../../services/groups.service";
import { toastStore } from "../../store/toast";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";

const NewCohortForm = ({ formData, setFormData, createCohort }) => {
    const { toast } = useContext(toastStore)
    const [error] = useState('')
    const [dates, setDates] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onChange=(e)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
//        e.preventDefault();

        try {
            // await GroupsService.createGroup(formData)
            // toast('success', 'New group was successfully created.')
            // window.location.href = '/students?a=Groups'
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
                <label htmlFor="name" className="block text-900 font-medium mb-20">Name</label>
                <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" onChange={onChange} required/>
            
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </div>
            <div className="card flex mt-4">
                <span className="p-float-label">
                    <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput required />
                    <label htmlFor="birth_date">Start - End Dates</label>
                </span>
            </div>
            <div className="mt-4">

            </div>
            <Button
                label="Create Cohort"
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

export default NewCohortForm;
