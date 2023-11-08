import React, {useState} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { useContext } from 'react';
import { authStore } from '../../store/auth';
import { SET_LOGGED_IN_USER } from "../../store/actions";
import { toastStore } from "../../store/toast";

const Login = () => {
    const [formData,setFormData]=useState({
        username:'',
        password:'',
    })

    const { dispatch } = useContext(authStore);
    const { toast } = useContext(toastStore);


    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data: authResponse} = await AuthService.login(formData);
            if (authResponse && authResponse.access_token) { // successful
                localStorage.setItem('jwtToken', authResponse.access_token);
                dispatch({ type: SET_LOGGED_IN_USER, payload: authResponse })
                if (authResponse.organisationId) {
                    window.location.href = '/students'
                } else {
                    window.location.href = '/organisation'
                }
            } else {
                toast('error', 'We failed to create your account. Please try again.')
            }
        } catch (e) {
            let error = e.response?.data?.error ? e.response?.data?.error : e.message
            toast('error', error === 'Unauthorized' ? 'Invalid email and/or password.': error)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <div className=" text-center text-900 text-4xl font-medium mb-3">Welcome Back!</div>
            <label htmlFor="username" className="block text-900 font-medium mb-20">Email</label>
            <InputText name="username" id="username" type="text" placeholder="Email address" className="w-full mb-3" onChange={onChange} required/>

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText name="password" type="password" placeholder="Password" className="w-full mb-3" onChange={onChange} />
            {/* {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null} */}

            {/* <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                    <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
            </div> */}

            <Button label="Login" icon="pi pi-user" className="m-auto bg-primary" />
        </form>
        <div className="mt-4">
            <div><Link className="font-medium no-underline text-blue-500 text-right cursor-pointer" to="../forgot-password">Forgot your password?</Link></div>
            <span className="text-900 font-medium line-height-3">Don't have an account?</span>
            <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="../signup">Signup here</Link>
        </div>
    </div>
    );
};

export default Login;
