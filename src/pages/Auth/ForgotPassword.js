import React, {useState, useContext} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { toastStore } from "../../store/toast";

const ForgotPassword = () => {
    const goTo = useNavigate()
    const { toast } = useContext(toastStore);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AuthService.resetPassword(formData);
            goTo(`/auth/change-password?email=${formData.email}`)
        } catch (e) {
            toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
        }
    }

    const [formData,setFormData]=useState({
        email:'',
    })

    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return (
        <div className="w-full m-auto m-2">
            <form onSubmit={handleSubmit}>
                <div className=" text-center text-900 text-2xl font-medium mb-6">Let's get you back into your account!</div>


                <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                <InputText id="email" name="email" type="text" placeholder="" className="w-full" aria-describedby="username-help" onChange={onChange} required />
                {formData.email!=='' 
                    ? <div><small id="username-help" className="mb-3">We will send you an OTP on this email.</small></div> : null
                }

                {/* <div className="flex align-items-center justify-content-between mb-6">
                    <div className="flex align-items-center">
                        <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                        <label htmlFor="rememberme">Remember me</label>
                    </div>
                    <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                </div> */}

                <Button label="Reset Password" type="submit" icon="pi pi-lock" className=" mt-2 m-auto bg-primary" />
            </form>
            <div className="mt-4">
                <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="../login">Login here</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
