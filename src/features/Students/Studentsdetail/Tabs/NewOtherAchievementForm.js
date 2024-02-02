import React, {useState} from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Tag } from "primereact/tag";

const NewOtherAchievementForm = ({ formData, setFormData, student }) => {
    const [error, setError] = useState()
    const [skillGained, setSkillGained] = useState('')
    const onChange=(e)=>{
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value, type: 'Other'})
        if (e.target.name === 'skillGained') {
            setSkillGained(e.target.value)
        }
    }

    const [selectedSkillsGained, setSelectedSkillsGained] = useState([])

    const handleSubmit = async (e) => {
        e.target.preventDefault()
        setSelectedSkillsGained([...new Set([...selectedSkillsGained, skillGained])])
        setError('')
        setFormData({...formData, skillGained: '', skillsGained: selectedSkillsGained, type: 'Other' })
    }

    const handleEnterKey = async (event) => {
        if (event.key === "Enter") {
            setSelectedSkillsGained([...new Set([...selectedSkillsGained, skillGained])])
            setError('')
            setFormData({...formData, skillGained: '', skillsGained: selectedSkillsGained })
        }
    }

    const removeSkillGained = async (removedSkill) => {
        const remainingSkills = selectedSkillsGained.filter(skill => skill !== removedSkill)
        setSelectedSkillsGained(remainingSkills)
        setFormData({ ...formData, skillsGained: remainingSkills })
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-900 font-medium mb-20">Name</label>
            <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" onChange={onChange} required/>

            <label htmlFor="date" className="block text-900 font-medium mb-20">Date</label>
            <InputText name="date" id="date" type="text" placeholder="e.g Sept, 2022" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="description" className="block text-900 font-medium mb-20">Description</label>
            <InputTextarea name="description" id="description" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="referenceLink" className="block text-900 font-medium mb-20">Reference Link (Optional)</label>
            <InputText name="referenceLink" id="referenceLink" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="skillGained" className="block text-900 font-medium mb-20">Skills Gained</label>
            <InputText name="skillGained" id="skillGained" type="text" placeholder="Separate multiple skills with commas" className="w-full mb-3" onChange={onChange} onKeyUp={handleEnterKey}/>
            <div className="flex flex-row">
                {skillGained.split(",").map((skill) => <Tag value={skill} icon="pi pi-times" className="mr-1" key={skill} onClick={() => removeSkillGained(skill)}></Tag>)}
            </div>
         
            {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
        </form>
    </div>
    );
};

export default NewOtherAchievementForm;
