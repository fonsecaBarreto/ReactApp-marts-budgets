import AddressForm, { AddressFormState } from '../../../Login/AddressForm'
import SignUpForm, {SignUpFormState} from '../../../Login/SignUpForm'
import AnnexsForm, { AnnexState} from '../../../Login/AnnexsForm'
import LoginCard from './LoginCard'
import { useState } from 'react'
import { signUpService } from '../../../../services/mart-login-service'
import { useHistory } from 'react-router-dom'
import React from 'react'
export default ({show, toggleMode, dialogState, onError }) =>{

    const history = useHistory()
    const [ loading, setLoading ] = useState(false)
    const addressFormState = AddressFormState()
    const signUpFormState = SignUpFormState()
    const annexState = AnnexState()

    const submit = async (e) =>{
        e.preventDefault()
        setLoading(true)

        try{
            const data = { 
                ...signUpFormState.inputsState.data, 
                address: {...addressFormState.inputsState.data}, 
                annexeses: annexState.files
            }

            await signUpService(data)

            dialogState.showSuccess( 
                "Cadastrado com successo!", 
                "Obrigado pela confiança, entraremos em contato em breve!",
                "Sucesso!", () => {  history.push("/login?v=signin") })

        }catch(err){
            if(err.params) {
                signUpFormState.errorsState.setErrors(err.params)
                if(err.params.address){
                    addressFormState.errorsState.setErrors(err.params.address) }
                if(err.params.annexs){
                    annexState.errorsState.setErrors([err.params.annexs]) }
            }
            onError && onError(err)
        }
        setLoading(false)
    } 
    return(

        <LoginCard loading={loading} show={show} title={'Cadastro'} className="login-sign-up-form">
            
            <React.Fragment>

                <SignUpForm state={signUpFormState}></SignUpForm>
            
                <AddressForm state={addressFormState}></AddressForm>
        
                <AnnexsForm state={annexState}></AnnexsForm> 

                <button onClick={submit} className="una-login-form-button" > { loading? "Enviando..." : 'Criar Conta grátis' } </button>

                <button className="una-login-light-button" onClick={toggleMode}> Já sou Cadastrado </button> 

            </React.Fragment>

        </LoginCard>
    )
}