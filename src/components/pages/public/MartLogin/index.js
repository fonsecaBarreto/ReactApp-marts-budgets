import React, { useState } from 'react'
import './style.css'

/* import SignUpForm, { SignUpState } from './SignUpForm'
import SignInForm, { SignInState } from './SignInForm/index.js'
import Logo from '../../../../assets/logo2.svg' */

import { useHistory } from 'react-router-dom'

import WarningDialog, { WarningState } from '../../../utils/WarningDialog'
import SignUpCard from './SignUpCard'
import SignInCard from './SignInCard'
export default () =>{
    const history = useHistory()
    const dialogState = WarningState()
    const [ toSignup, setToSignup ] = useState(false)

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
        
        switch(err.name){
            case "InvalidFileBufferError": {
                dialogState.showFailure("Atenção!",err.message)
            };break;
            default: dialogState.showFailure(err.message)
        } 
    }
    return (
        <div id="login-screen"> 
            
            <SignUpCard show={toSignup} toggleMode={toggleMode} dialogState={dialogState}
                onError={handleErrors}></SignUpCard>

            <SignInCard show={!toSignup} toggleMode={toggleMode} dialogState={dialogState}
                onError={handleErrors}></SignInCard>

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog> 
        </div>
  )
}