import React, { useState } from 'react'
import SignInForm, { SignInFormState} from '../../../Login/SignInForm'
import LoginCard from './LoginCard'
import { useHistory } from 'react-router-dom'
import { signInService, forgotPasswordService } from '../../../../services/mart-login-service'
import { useDispatch } from  'react-redux'
import { setMart } from '../../../../store/reducers/global/actions'
import { RiShieldKeyholeLine, } from 'react-icons/ri'

export default ({show, toggleMode, onError, dialogState}) =>{

    const history = useHistory()
    const dispatch = useDispatch()
    const formState = SignInFormState()
    const [ loading, setLoading ] = useState(false)

    const submit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await signInService(formState.inputsState.data)
            dispatch(setMart(null))
            formState.clearAll()
            history.push("/marts/orcamento") 
        }catch(err){
            if(err.params) formState.errorsState.setErrors(err.params)
            onError && onError(err)
        }
        setLoading(false)
    }

    const forgotMyPassword = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await forgotPasswordService(formState.inputsState.data.credentials)
            formState.clearAll()
            dialogState.showSuccess( 
                "...", 
                "Você recebera em instantes um E-mail para redefinição de senha",
                "Sucesso!",
                async () => {  history.push("/") })
        }catch(err){
            if(err.params) formState.errorsState.setErrors(err.params)
            onError && onError(err) 
        }
        setLoading(false)
    } 

    return(

        <LoginCard loading={loading} show={show} title={'Login'} className="login-sign-in-form">
   
            <SignInForm state={formState}></SignInForm>

            <button onClick={submit} className="una-login-form-button" > { loading? "Enviando..." : 'Entrar' }</button>

            <div className="opt-row">
             {/*    <button className="light-button" onClick={toggleMode}> Me Cadastrar </button>  
                <div className="signin-divider"></div> */}
                <button 
                    onClick={forgotMyPassword}
                    className="light-button"> 
                    <RiShieldKeyholeLine></RiShieldKeyholeLine>
                    Esqueci a senha
                </button>
            </div>
 
        </LoginCard>
    )
}