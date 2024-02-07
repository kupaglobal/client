import React, {useState} from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const EditPortfolioForm = ({ formData, setFormData, type, savePortfolio, isLoading }) => {
    const [error, setError] = useState()
    const onChange=(e)=>{
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value, type })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setFormData({...formData, skillGained: '', type })
        await savePortfolio()
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="block text-900 font-medium mb-20">Title</label>
            <InputText name="title" id="title" type="text" placeholder="" className="w-full mb-3" value={formData.title} onChange={onChange} required/>

            <label htmlFor="category" className="block text-900 font-medium mb-20">Category</label>
            <InputText name="category" id="category" type="text" placeholder="" className="w-full mb-3" value={formData.category} onChange={onChange} required/>

            <label htmlFor="date" className="block text-900 font-medium mb-20">Date</label>
            <InputText name="date" id="date" type="text" placeholder="e.g Sept, 2022" className="w-full mb-3" value={formData.date} onChange={onChange}/>

            <label htmlFor="referenceLink" className="block text-900 font-medium mb-20">Reference Link</label>
            <InputText name="referenceLink" id="referenceLink" type="url" placeholder="" className="w-full mb-3" value={formData.referenceLink} onChange={onChange}/>

            <label htmlFor="description" className="block text-900 font-medium mb-20">Description</label>
            <InputTextarea name="description" id="description" type="text" placeholder="" className="w-full mb-3" value={formData.description} onChange={onChange}/>
         
            <Button
                label="Save Changes"
                icon="pi pi-image"
                type="submit"
                className="custom-button"
                loading={isLoading}
            />
 
            {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
        </form>
    </div>
    );
};

export default EditPortfolioForm;
