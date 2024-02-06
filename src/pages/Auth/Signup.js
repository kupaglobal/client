import React, {useEffect, useState} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { useContext } from 'react';
import { authStore } from '../../store/auth';
import { SET_LOGGED_IN_USER } from "../../store/actions";
import { toastStore } from "../../store/toast";


const Signup = () => {
    const goTo = useNavigate()
    const { dispatch } = useContext(authStore);
    const { toast } = useContext(toastStore);

    useEffect(() => {
        
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data: authResponse, response: error} = await AuthService.signup(formData);
            if (authResponse && authResponse.access_token) { // successful
                localStorage.setItem('jwtToken', authResponse.access_token);
                dispatch({ type: SET_LOGGED_IN_USER, payload: authResponse })
                window.location.href = '/auth/verify-email'
            } else {
                toast('error', error.data?.message || 'We failed to create your account. Please try again.')
            }
        } catch (e) {
            toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        }
    }

    const [formData,setFormData]=useState({
        fullName: '',
        email:'',
        password:'',
    })

    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return (
        <div className="w-full m-auto m-2">
            <form onSubmit={handleSubmit}>
                <div className=" text-center text-900 text-2xl font-medium mb-6">Welcome, let's get you started!</div>


                <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                <InputText id="email" name="email" type="text" placeholder="" className="w-full" aria-describedby="username-help" onChange={onChange} required />
                {formData.email!=='' 
                    ? <small id="username-help" className="mb-3">We will send you an OTP on this email.</small> : null
                }


                <label htmlFor="password" className="block text-900 font-medium mt-4">Password</label>
                <InputText type="password" name="password" placeholder="" className="w-full mb-3" onChange={onChange} required />

                {/* <div className="flex align-items-center justify-content-between mb-6">
                    <div className="flex align-items-center">
                        <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                        <label htmlFor="rememberme">Remember me</label>
                    </div>
                    <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                </div> */}

                <Button label="Create Account" type="submit" icon="pi pi-user" className=" mt-2 m-auto bg-primary" />
            </form>
            <div className="mt-4">
                <span className="text-900 font-medium line-height-3">Already have an account?</span>
                <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="../login">Login here</Link>
            </div>
        </div>
    );
};

export default Signup;
