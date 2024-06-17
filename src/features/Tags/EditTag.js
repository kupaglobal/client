import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { toastStore } from "../../store/toast";
import { Button } from "primereact/button";
import { TagsService } from "../../services/tags.service";

const EditTagForm = ({ tag, formData, setFormData }) => {
    const { toast } = useContext(toastStore)
    const [error] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const onChange=(e)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            await TagsService.editTag(tag.id, {
                name: formData.name,
            })
            toast('success', 'Tag was successfully edited.')
            window.location.href = '/students?a=Tags'
            setIsLoading(false)
        } catch (e) {
            toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
            setIsLoading(false)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="name" className="block text-900 font-medium mb-20">Name</label>
                <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" value={formData.name} onChange={onChange} required/>
            
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
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

export default EditTagForm;
