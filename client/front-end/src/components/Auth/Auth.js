import React, {useState} from 'react'
import InputCont from './InputCont'
import {useDispatch} from "react-redux"
import {useHistory } from 'react-router-dom'
import {GoogleLogin} from "react-google-login"
import {signInNewProfile, signUpNewAccount } from '../../REDUX/action/auth'
import {Container, Grid} from "@material-ui/core"
import img from './icon.jpeg'
import "./Auth.css"


const Auth = () => {
    const INITIAL_STATE = {
        name:"",
        surname:"",
        email:"",
        password:"",
        confirmPassword: ""
    }

const [showPass, setShowPass] = useState(false)
const [isSignUp, setIsSignUp] = useState(false)
const [inputData, setInputData] = useState(INITIAL_STATE)
const dispatch = useDispatch()
const history = useHistory()


    const handleSubmit = event => {
        event.preventDefault()

        if(isSignUp){
            dispatch(signUpNewAccount(inputData, history))
        }else{
            dispatch(signInNewProfile(inputData, history))
        }
    }
    const handleShowPassword = () => setShowPass(prev => !prev ) //Toggling show password function that will make password visible to check out
    
    const handleChange = event => {
        setInputData({...inputData, [event.target.name]: event.target.value})
    }
    const switchMode = () => {
        setIsSignUp(prev => !prev)
        setShowPass(false)
    }

    //Google Authentication
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId

        try{
            dispatch({type: "AUTH", payload: {result, token}})
            history.push("/")
        }catch(error){
            console.log(error)
        }
    }
    const googleFailure = () => {
        console.log("Google sing in process was unsuccessful. Try again")
    }

    return (
        <div className=" main-container">
            <Container>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
            <form className="main form-container" onSubmit={handleSubmit}>
            <img src={img} className="avatar mt-2 mb-1"/>
        <div className="h1">{isSignUp ? "Sign up" : "Sign in"}</div> 
        <Grid container spacing={2}> 
        <div className="container-wrapper">
            {isSignUp && (
                <>
                    <div className=" main-input-group">
                    <InputCont name="name" label="Your name" handleChange={handleChange}/>
                    <InputCont name="surname" label="Your surname" handleChange={handleChange}/>
                    </div>
                </>
            )}
            <div className="second-input-group text-white">
                <div className="first">
                <InputCont name="email" label="Email" handleChange={handleChange} type={"email"} />
                </div>
            <InputCont name="password" label="Password" handleChange={handleChange} type={showPass ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            </div>
            {isSignUp && (
                <div className="password-confirmation">
                     <InputCont name="confirmPassword" label="Password Confirmation" handleChange={handleChange} type="password" handleShowPassword={handleShowPassword}/>
                </div>
            )}
        </div>
        </Grid>
        <GoogleLogin
         clientId="74369160375-94lchn31v8jivfash19jfe9605cs8v07.apps.googleusercontent.com"
         render={renderProps => (
             <button className="btn btn-primary mt-5 p-2 rounded" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign up with Google</button>
         )}
         onSuccess = {googleSuccess}
         onFailure = {googleFailure}
         cookiePolicy = "single_host_origin"
         />
                <div className="button">
                <button type="submit" className="btn btn-success">{isSignUp ? "Sign up" : "Sign in"}</button>
                </div>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <div className="p-tag">
                    <p onClick={switchMode}>{isSignUp ? "Already have an account? Sign in" : "Don't have an account ? Sign up"}</p>
                    </div>
                </Grid>
            </Grid>
</form>
</div>
</Container>
        </div>
    )
}

export default Auth
