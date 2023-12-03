import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { GroupsService } from "../../services/groups.service";
import { toastStore } from "../../store/toast";

const NewGroupForm = ({ formData, setFormData }) => {
    const { toast } = useContext(toastStore)
    const [error, setError] = useState('')
    const onChange=(e)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await GroupsService.createGroup(formData)
            toast('success', 'New group was successfully created.')
            window.location.href = '/students?a=Groups'
        } catch (e) {
            toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-900 font-medium mb-20">Name</label>
            <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" onChange={onChange} required/>
         
            {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
        </form>
    </div>
    );
};

export default NewGroupForm;
