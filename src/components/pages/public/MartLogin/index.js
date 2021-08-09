import React, { useState } from 'react'
import './root.css'
import './style.css'


import SignUpForm, { SignUpState } from './SignUpForm'
import SignInForm, { SignInState } from './SignInForm/index.js'
import { withRouter } from 'react-router-dom'
import WarningDialog, { WarningState } from '../../../utils/WarningDialog'
import Logo from '../../../../assets/logo2.svg'

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

        const err = history.location.search.split("?e=")[1]
        if(err) return dialogState.showFailure(  err.replace(/%20/g, " "))
        
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
            "Obrigado pela confiança, entraremos em contato em breve!",
            "Sucesso!",
            async () => {  history.push("/") })
    }

    const handleSignInSuccess = () => { history.push("/marts/orcamento") }

    const handleForgotSuccess = () =>{
        dialogState.showSuccess( 
            "...", 
            "Você recebera em instantes um E-mail para redefinição de senha",
            "Sucesso!",
            async () => {  history.push("/") })
    }

    return (
        <div id="login-screen"> 

            <div className={`login-box ${!toSignup? 'show':''} ${ loading ? 'loading' : ''}`}>
                <img src={Logo} className="login-logo" ></img>
                <div className="login-box-content">
                    <span className="login-header-text"> Login </span>
                    <SignInForm 
                        setLoading={setLoading}
                        { ...signinState } 
                        toggleMode={toggleMode}
                        onError={handleErrors}
                        onSuccess={handleSignInSuccess}
                        forgotSuccess={handleForgotSuccess}>
                    </SignInForm>
                    <span className="small-span">Copyright©2021, UnaCompras. Todos os direitos reservados.</span>
                </div>
            </div>


            <div className={` login-box ${toSignup? 'show': '' } ${loading ? 'loading' : ''} `}>
                <img src={Logo} className="login-logo" ></img>
                <div className="login-box-content">
    
                    <span className="login-header-text"> Cadastro</span>
                    <SignUpForm 
                        setLoading={setLoading}
                        { ...signupState } 
                        toggleMode={toggleMode}
                        onError={handleErrors}
                        onSuccess={handleSuccess}>
                    </SignUpForm> 
                    <span className="small-span">Copyright©2021, UnaCompras. Todos os direitos reservados.</span>
                </div>
            </div>

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
  )
})  