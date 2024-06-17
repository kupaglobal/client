import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { CohortsService } from "../../services/cohorts.service";
import { toastStore } from "../../store/toast";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { InputTextarea } from "primereact/inputtextarea";

const EditCohortForm = ({ cohort, formData, setFormData }) => {
    const { toast } = useContext(toastStore)
    const [error] = useState('')
    const [dates, setDates] = useState([new Date(formData.startDate), new Date(formData.endDate)]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCurrency, setSelectedCurrency] = useState(formData.costPerStudentCurrency)
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
                endDate: dates[1],
                description: formData.description,
                costPerStudent: formData.costPerStudent,
                costPerStudentCurrency: selectedCurrency,
                lowestAge: formData.lowestAge,
                highestAge: formData.highestAge
            })
            toast('success', 'Cohort was successfully edited.')
            window.location.href = '/students?a=Cohorts'
            setIsLoading(false)
        } catch (e) {
            toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
            setIsLoading(false)
        }
    }
    function handleCurrencyChange(e) {
        setSelectedCurrency(e.value)
        onChange({
            target: {
                name: 'costPerStudentCurrency',
                value: e.value
            }
        })
    } 

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="name" className="block text-900 font-medium mb-20">Cohort Name</label>
                <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" value={formData.name} onChange={onChange} required/>
            
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </div>
            <div>
                <label htmlFor="description" className="block text-900 font-medium mb-20">Description</label>
                <InputTextarea name="description" id="description" type="text" placeholder="" className="w-full mb-3" value={formData.description} onChange={onChange}/>

            </div>
            <div className="">
                <label htmlFor="costPerStudent" className="block text-900 font-medium mb-20">Funding Cost Per Student</label>
                <InputText name="costPerStudent" value={formData.costPerStudent} id="costPerStudent" type="text" placeholder="" className="w-full mb-3" onChange={onChange} required/>
            </div>

            <div className="">
                <label htmlFor="costPerStudentCurrency" className="block text-900 font-medium mb-20">Currency</label>
                <SelectButton name="costPerStudentCurrency" value={selectedCurrency} onChange={(e) => handleCurrencyChange(e)} options={['GBP', 'USD']} />
            </div>
            <div className="card flex mt-6 mb-4">
                <span className="p-float-label">
                    <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" dateFormat="dd/mm/yy" required />
                    <label htmlFor="range">Start - End Dates</label>
                </span>
            </div>
            <div className="">
                <label htmlFor="lowestAge" className="block text-900 font-medium mb-20">Lowest Age</label>
                <InputText name="lowestAge" id="lowestAge" type="number" placeholder="e.g 13" className="w-full mb-3" value={formData.lowestAge} onChange={onChange} required/>
            </div>
            <div className="">
                <label htmlFor="highestAge" className="block text-900 font-medium mb-20">Highest Age</label>
                <InputText name="highestAge" id="highestAge" type="number" placeholder="e.g 19" className="w-full mb-3" value={formData.highestAge} onChange={onChange} required/>
            </div>

            <Button
                label="Edit Cohort"
                icon="pi pi-users"
                type="submit"
                className="custom-button"
                disabled={!formData.name || !formData.costPerStudent || !formData.costPerStudentCurrency}
                loading={isLoading}
            />

        </form>
    </div>
    );
};

export default EditCohortForm;
