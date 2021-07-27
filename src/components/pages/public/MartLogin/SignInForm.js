import React, { useState } from "react"
import FormRow from '../../../utils/FormRow'

import { signInService, forgotPasswordService} from '../../../../services/mart-login-service'
import { RiShieldKeyholeLine, RiShieldUserLine } from 'react-icons/ri'
import { useDispatch } from  'react-redux'
import { setMart } from '../../../../store/reducers/global/actions'

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

            <FormRow label="Email, Telefone ou cnpj/cpf" error={errors?.['credentials']}>
                <input autoFocus value={credentials} type="text" onInput={e=>handleInputs('credentials',e.target.value)}></input>
            </FormRow>

            <FormRow label="Senha de acesso" error={errors?.['password']}>
                <input value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
            </FormRow>

            <button onClick={submit} 
                className={`una-login-form-button ${ sending ? 'loading': 'false' }`} > 
                entrar
            </button>

            <div className="signin-opt">

                <button className="light-button " onClick={toggleMode}>  Me Cadastrar</button>

                <div className="bearer "></div>

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