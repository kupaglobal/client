import React, {useState, useRef} from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { useContext } from 'react';
import { authStore } from '../../store/auth';
import { SET_LOGGED_IN_USER } from "../../store/actions";
const Login = () => {
    const [formData,setFormData]=useState({
        username:'',
        password:'',
    })

    const [error, setError] = useState()
    const onChange=(e)=>{
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const goTo = useNavigate()
    const { state, dispatch } = useContext(authStore);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError()

        try {
            const {data: authResponse} = await AuthService.login(formData);
            if (authResponse && authResponse.access_token) { // successful
                localStorage.setItem('jwtToken', authResponse.access_token);
                dispatch({ type: SET_LOGGED_IN_USER, payload: authResponse })
                goTo('/dashboard')
            } else {
                setError('We failed to create your account. Please try again.')
            }
        } catch (e) {
            setError(e.response?.data?.error ? e.response?.data?.error : e.message)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <div className=" text-center text-900 text-5xl font-medium mb-3">Welcome Back!</div>
            <label htmlFor="username" className="block text-900 font-medium mb-20">Email</label>
            <InputText name="username" id="username" type="text" placeholder="Email address" className="w-full mb-3" onChange={onChange} required/>

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText name="password" type="password" placeholder="Password" className="w-full mb-3" onChange={onChange} />
            {error!='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}

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
            <span className="text-900 font-medium line-height-3">Don't have an account?</span>
            <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="../signup">Signup here</Link>
        </div>
    </div>
    );
};

export default Login;
