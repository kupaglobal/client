import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { TagsService } from "../../services/tags.service";
import { toastStore } from "../../store/toast";

const NewTagForm = ({ formData, setFormData }) => {
    const { toast } = useContext(toastStore)
    const [error] = useState('')
    const onChange=(e)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await TagsService.createTag(formData)
            toast('success', 'New Tag was created.')
            window.location.href = '/students?a=Tags'
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

export default NewTagForm;
