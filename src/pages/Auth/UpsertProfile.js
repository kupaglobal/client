import React, {useState, useRef} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { useContext } from 'react';
import { authStore } from '../../store/auth';
import { SET_LOGGED_IN_USER } from "../../store/actions";

const EmailVerification = () => {
    const goTo = useNavigate()
    const { state, dispatch } = useContext(authStore);
    const { loggedInUser } = state

    const [profileFormData,setProfileFormData]=useState({
        firstName:'',
        lastName: ''
    })

    const upsertProfile = async (e) => {
        e.preventDefault();
        setError()

        try {
            const {data: authResponse} = await AuthService.upsertProfile(profileFormData);
            if (authResponse && authResponse.emailVerified === true) { // successful
                goTo('/dashboard?welcome')
            } else {
                setError('We failed to create your account. Please try again.')
            }
        } catch (e) {
            if (e.response?.data?.error == "Email already verified") {
                goTo('/dashboard?welcome')
            } else {
                setError(e.response?.data?.error ? e.response?.data?.error : e.message)
            }
        }
    }

    const [error, setError] = useState()

    const onProfileChange=(e)=>{
        setError('')
        setProfileFormData({...profileFormData,[e.target.name]:e.target.value})
    }


    return (

        <div>
            <div  className="w-full m-auto m-2" style={{
                transition: "all 1.3s ease-in-out",
            }}>
                <form onSubmit={upsertProfile}>
                    <div className=" text-center text-900 text-2xl font-medium mb-6">One last thing...</div>

                    <label htmlFor="firstName" className="block text-900 font-medium mb-2">Your First Name</label>
                    <InputText id="firstName" name="firstName" type="text" placeholder="" className="w-full" onChange={onProfileChange} />

                    <label htmlFor="lastName" className="block text-900 font-medium mb-2 mt-4">Last Name</label>
                    <InputText id="lastName" name="lastName" type="text" placeholder="" className="w-full" onChange={onProfileChange} />

                    <Button label="Save & Proceed" type="submit" icon="pi pi-user" className=" mt-6 m-auto bg-primary" />
                </form>
            </div>
            {error!='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
        </div>
    );
};

export default EmailVerification;
