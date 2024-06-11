import React, {useContext, useState} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { toastStore } from "../../store/toast";
import { authStore } from "../../store/auth";
import { SET_LOGGED_IN_USER } from "../../store/actions";

const UpsertProfile = () => {
    const [queryParams] = useSearchParams()
    const IsNewUser = queryParams.get('nn') === null ?? false
    const goTo = useNavigate()
    const { dispatch } = useContext(authStore);
    const { toast } = useContext(toastStore)
    const [isLoading, setIsLoading] = useState(false)

    const [profileFormData,setProfileFormData]=useState({
        firstName:'',
        lastName: ''
    })

    const upsertProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            const {data: authResponse} = await AuthService.upsertProfile(profileFormData);
            if (authResponse && authResponse.emailVerified === true) { // successful
                const {data: profileRes} = await AuthService.getProfile()
                dispatch({ type: SET_LOGGED_IN_USER, payload: profileRes })
                if (IsNewUser && !authResponse.organisationId) {
                    goTo('/dashboard?welcome')
                } else {
                    goTo('/dashboard')
                }
            } else {
                toast('error','We failed to update your profile. Please try again.')
            }
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            if (e.response?.data?.error === "Email already verified") {
                goTo('/dashboard?welcome')
            } else {
                toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
            }
        }
    }

    const onProfileChange=(e)=>{
        setProfileFormData({...profileFormData,[e.target.name]:e.target.value})
    }

    return (

        <div>
            <div  className="w-full m-auto m-2" style={{
                transition: "all 1.3s ease-in-out",
            }}>
                <form onSubmit={upsertProfile}>
                    <div className=" text-center text-900 text-2xl font-medium mb-6">{IsNewUser ? 'One last thing...' : 'Please tell us your name...'}</div>

                    <label htmlFor="firstName" className="block text-900 font-medium mb-2">First Name</label>
                    <InputText id="firstName" name="firstName" type="text" placeholder="" className="w-full" onChange={onProfileChange} />

                    <label htmlFor="lastName" className="block text-900 font-medium mb-2 mt-4">Last Name</label>
                    <InputText id="lastName" name="lastName" type="text" placeholder="" className="w-full" onChange={onProfileChange} />

                    <Button label="Save & Proceed" loading={isLoading} type="submit" icon="pi pi-user" className=" mt-6 m-auto bg-primary" />
                </form>
            </div>
        </div>
    );
};

export default UpsertProfile;
