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
    const [ otpHelpText, setOtpHelpText ] = useState(`We sent you an email on ${loggedInUser.email }`)

    const [tokenFormData,setTokenFormData]=useState({
        token:'',
    })
    const [profileFormData,setProfileFormData]=useState({
        firstName:'',
        lastName: ''
    })

    const verifyEmail = async (e) => {
        e.preventDefault();
        setError('')

        try {
            const {data: authResponse} = await AuthService.verifyEmail(tokenFormData);
            if (authResponse && authResponse.emailVerified === true) { // successful
                setTokenFormData({
                    token:'',
                })
                goTo('/auth/profile')
            } else {
                setError('We failed to verify your email. Please try again.')
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
    const onChange=(e)=>{
        setError('')
        setTokenFormData({...tokenFormData,[e.target.name]:e.target.value})
    }

    const onProfileChange=(e)=>{
        setError('')
        setProfileFormData({...profileFormData,[e.target.name]:e.target.value})
    }

    const resendEmailVerification = async () => {
        try {
            const res = await AuthService.resendEmailVerification();
            if (res) { // successful
                setOtpHelpText(`Another email has been sent to ${loggedInUser.email}`)
            } else {
                setError('We failed to send you another email. Please try again.')
            }
        } catch (e) {
            console.log(e)
            if (e.response?.data?.error == "Email already verified") {
                goTo('/dashboard?welcome')
            } else {
                setError('We failed to send you another email. Try again.')
            }
        }
    }

    return (

        <div>
            <div className="w-full m-auto m-2" style={{
                transition: "all 1.3s ease-in-out",
            }}>
                <form onSubmit={verifyEmail}>
                    <div className=" text-center text-900 text-2xl font-medium mb-6">Verify your email.</div>

                    <label htmlFor="token" className="block text-900 font-medium">OTP</label>
                    <InputText id="token" name="token" type="text" placeholder="" className="w-full" aria-describedby="token-help" onChange={onChange} />
                    <div>
                        <small id="token-help" className="mb-3">{otpHelpText}</small>
                    </div>

                    {/* <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                    </div> */}

                    <Button label="Verify" type="submit" icon="pi pi-envelope" className=" mt-6 m-auto bg-primary" />
                </form>
                <div className="mt-4">
                    <span className="text-900 font-medium line-height-3">Haven't received an email from us?</span>
                    <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={resendEmailVerification}>Resend OTP</Link>
                </div>
            </div>
            {error!='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
        </div>
    );
};

export default EmailVerification;
