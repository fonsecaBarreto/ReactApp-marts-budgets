import React, { useState } from 'react'
import './style.css'

import SignUpForm, { SignUpState } from './SignUpForm'
import SignInForm, { SignInState } from './SignInForm.js'
import Logo from '../../../../assets/logo.jpg'
import { withRouter } from 'react-router-dom'
import WarningDialog, { WarningState } from '../../../utils/WarningDialog'

export default withRouter(({ history }) =>{

    const dialogState = WarningState()

    const [ loading, setLoading ] = useState(false)
    const [ toSignup, setToSignup ] = useState(false)
    const signinState = SignInState()
    const signupState = SignUpState()

    const toggleMode = (e) =>{
        e.preventDefault()
        setToSignup(!toSignup)
    }

    useState(()=>{
        if(!history.location.search ) return;
        const mode = history.location.search.split("?v=")[1]
        switch (mode) {
            case 'signup': setToSignup(true); break;
            default: setToSignup(false); break;
        }
        
    },[history, history.location])

    const handleErrors = (err) =>{
           /*      case "InvalidRequestBodyError" : dialogState.showFailure(err.message);break
            case "EmailInUseError": dialogState.showFailure(err.message);break  */
        switch(err.name){
            case "InvalidFileBufferError": {
                dialogState.showFailure("Atenção!",err.message)
                signupState.setAnnex(null)
            };break;
            default: dialogState.showFailure(err.message)
        }
    }

    const handleSuccess = (data) => {
        dialogState.showSuccess( 
            "Cadastrado com successo!", 
            "Obrigados pela confiança, entraremos em contato em breve!",
            "Sucesso!",
            async () => {  history.push("/login/saudacoes") })
    }

    const handleSignInSuccess = () => { history.push("/") }

    const handleForgotSuccess = () =>{
        dialogState.showSuccess( 
            "...", 
            "Voce Recebera em breve um E-mail para resetar sua senha",
            "Sucesso!",
            async () => {  history.push("/") })
    }

    return (
        <div id="login-screen"> 

            <div className={`login-box ${!toSignup? 'show':''} ${ loading ? 'loading' : ''}`}>
                <div className="login-box-content">
                    <img src={Logo} className="login-logo"></img>
                    <span className="login-header-text"> Login </span>
                    <SignInForm 
                        setLoading={setLoading}
                        { ...signinState } 
                        toggleMode={toggleMode}
                        onError={handleErrors}
                        onSuccess={handleSignInSuccess}
                        forgotSuccess={handleForgotSuccess}>
                    </SignInForm>
                </div>
            </div>


            <div className={` login-box ${toSignup? 'show': '' } ${loading ? 'loading' : ''} `}>
                 <div className="login-box-content">
                    <img src={Logo} className="login-logo"></img>
                    <span className="login-header-text"> Cadastrar-se </span>
                    <SignUpForm 
                        setLoading={setLoading}
                        { ...signupState } 
                        toggleMode={toggleMode}
                        onError={handleErrors}
                        onSuccess={handleSuccess}>
                    </SignUpForm> 
                </div>
            </div>

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
  )
})  