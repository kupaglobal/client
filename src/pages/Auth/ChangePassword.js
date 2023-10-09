import React, {useState} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { useContext } from 'react';
import { toastStore } from "../../store/toast";
const ChangePassword = () => {
    const [queryParams] = useSearchParams()

    const email = queryParams.get('email')
    const [formData,setFormData]=useState({
        email,
        passwordResetToken:'',
        password:'',
    })

    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const goTo = useNavigate()
    const { toast } = useContext(toastStore);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AuthService.changePassword(formData);
            goTo('/auth/login')
        } catch (e) {
            toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <div className=" text-center text-900 text-3xl font-medium mb-5">Change Password</div>

            <label htmlFor="passwordResetToken" className="block text-900 font-medium mb-20">OTP</label>
            <InputText name="passwordResetToken" id="passwordResetToken" type="text" placeholder="e.g 123456" className="w-full" onChange={onChange} required/>
            <small id="username-help" className="mb-5">Enter the OTP sent to {email || 'your email.'}</small>

            <label htmlFor="password" className="block text-900 font-medium mt-4">New Password</label>
            <InputText name="password" type="password" placeholder="Password" className="w-full mb-3" onChange={onChange} />

            {/* <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                    <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
            </div> */}

            <Button label="Save Password" icon="pi pi-lock" className="m-auto bg-primary" />
        </form>
        <div className="mt-4">
            <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="../login">Back to Login</Link>
        </div>
    </div>
    );
};

export default ChangePassword;
