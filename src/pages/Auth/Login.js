import React from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import { useRef } from "react";
const Login = () => {
    const auth = useRef({
        username: "bucks",
        password: ""
    })
    return (
    <div className="w-full m-auto m-2">
        <div>
            <div className=" text-center text-900 text-5xl font-medium mb-3">Welcome Back!</div>
            <label htmlFor="email" className="block text-900 font-medium mb-20">Email</label>
            <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" value={auth.current.username} />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText type="password" placeholder="Password" className="w-full mb-3" />

            {/* <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                    <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
            </div> */}

            <Button label="Login" icon="pi pi-user" className="m-auto bg-primary" />
        </div>
        <div className="mt-4">
            <span className="text-900 font-medium line-height-3">Don't have an account?</span>
            <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="../signup">Signup here</Link>
        </div>
    </div>
    );
};

export default Login;
