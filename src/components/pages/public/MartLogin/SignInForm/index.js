import React, { useState } from "react"
import './style.css'
import LoginFormRow from '../LoginFormRow'

import { signInService, forgotPasswordService} from '../../../../../services/mart-login-service'
import { RiShieldKeyholeLine, } from 'react-icons/ri'
import { useDispatch } from  'react-redux'
import { setMart } from '../../../../../store/reducers/global/actions'
import { FaRegUserCircle } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
const INITIAL_SIGNIN_DATA = {
    credentials: "",
    password: "",
}

export const SignInState = () =>{

    const [ inputs, setInputs ] = useState(INITIAL_SIGNIN_DATA)
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) =>{ 
        setInputs(prev => ({  ...prev,  [key]:value  }))
    }
    const clearInputs = () => {
        return setInputs({ ...INITIAL_SIGNIN_DATA })
    }

    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs }
}

export default ({setLoading, inputs, errors, setErrors, handleInputs, toggleMode, onError, clearInputs, onSuccess, forgotSuccess}) =>{
    const dispatch = useDispatch()
    const [ sending, setSending ] = useState(true)
    
    const submit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await signInService(inputs)
            dispatch(setMart(null))
            clearInputs()
            setErrors({})
            onSuccess && onSuccess()
        }catch(err){
            if(err.params) setErrors(err.params)
            onError && onError(err)
        }
        setLoading(false)
        
    }

    const forgotMyPassword = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await forgotPasswordService(inputs.credentials)
            clearInputs()
            setErrors({})
            forgotSuccess && forgotSuccess()
        }catch(err){
            if(err.params) setErrors(err.params)
            onError && onError(err) 
        }

        setLoading(false)
    }
    const { credentials, password } = inputs

    return(
        <form className={` login-form signin-form `}>

            <LoginFormRow label="E-mail, Telefone ou CNPJ/CPF" error={errors?.['credentials']} fixedLabel>
                <div className="login-input-wrapper">
                    <FaRegUserCircle className="liw-icon"></FaRegUserCircle>
                    <input autoFocus value={credentials} type="text" onInput={e=>handleInputs('credentials',e.target.value)}></input>
                </div>
            </LoginFormRow>

            <LoginFormRow label="Senha de Acesso" error={errors?.['password']} fixedLabel>
                <div className="login-input-wrapper">
                    <RiLockPasswordLine className="liw-icon"></RiLockPasswordLine>
                    <input value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
                </div>
            </LoginFormRow>

            <button onClick={submit} 
                className={`una-login-form-button ${ sending ? 'loading': 'false' }`} > 
                entrar
            </button>

            <div className="signin-opt">

                <button 
                    onClick={forgotMyPassword}
                    className="light-button"> 
                    <RiShieldKeyholeLine></RiShieldKeyholeLine>
                    Esqueci a senha
                </button>
            </div>

        </form>
    )
}