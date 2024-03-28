import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { CohortsService } from "../../services/cohorts.service";
import { toastStore } from "../../store/toast";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";

const EditCohortForm = ({ cohort, formData, setFormData }) => {
    console.log('formData', formData)
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
                costPerStudent: formData.costPerStudent,
                costPerStudentCurrency: selectedCurrency
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
            <div className="">
                <label htmlFor="costPerStudent" className="block text-900 font-medium mb-20">Funding Cost Per Student</label>
                <InputText name="costPerStudent" value={formData.costPerStudent} id="costPerStudent" type="text" placeholder="" className="w-full mb-3" onChange={onChange} required/>
            </div>

            <div className="">
                <label htmlFor="costPerStudentCurrency" className="block text-900 font-medium mb-20">Currency</label>
                <SelectButton name="costPerStudentCurrency" value={selectedCurrency} onChange={(e) => handleCurrencyChange(e)} options={['GBP', 'USD']} />
            </div>
            <div className="card flex mt-6 mb-2">
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
                disabled={!formData.name || !formData.costPerStudent || !formData.costPerStudentCurrency}
                loading={isLoading}
            />

        </form>
    </div>
    );
};

export default EditCohortForm;
