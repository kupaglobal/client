import React, {useState} from "react";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import OrganisationService from "../../services/organisation.service";

const InviteMemberForm = () => {
    const [formData,setFormData]=useState({
        email: ""
    })

    const [error, setError] = useState()
    const onChange=(e)=>{
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const goTo = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError()

        try {
            await OrganisationService.sendInvitation(formData)
            goTo('/organisations?team-members')
        } catch (e) {
            setError(e.response?.data?.error ? e.response?.data?.error : e.message)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-900 font-medium mb-20">Email</label>
            <InputText name="email" id="email" type="email" placeholder="" className="w-full mb-3" onChange={onChange} required/>
        </form>
    </div>
    );
};

export default InviteMemberForm;
