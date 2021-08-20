import React, { useState } from 'react'
import './style.css'
import SignUpForm, {SignUpState} from '../../../MartLogin/SignUpForm'
import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import { useHistory } from 'react-router'
export default () =>{
    const history = useHistory()

    const dialogState = WarningState()
    const [ loading, setLoading ] = useState(false)
    const signupState = SignUpState()

    const handleErrors = (err) =>{
        switch(err.name){
            case "InvalidFileBufferError": {
                dialogState.showFailure("Atenção!",err.message)
            };break;
            default: dialogState.showFailure(err.message)
        }
    }

    const handleSuccess = (data) => {
        dialogState.showSuccess( 
            "Cadastrado com successo!", 
            "Obrigado pela confiança, entraremos em contato em breve!",
            "Sucesso!",
            async () => {  history.push("/login") })
    }


    return (
        <React.Fragment>
                {/* Handle loading here */}
        <div className="main-content-left-side">
            <SignUpForm 
                setLoading={setLoading}
                { ...signupState } 
                onError={handleErrors}
                onSuccess={handleSuccess}>
            </SignUpForm> 
        </div>

        <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </React.Fragment>
    )
}