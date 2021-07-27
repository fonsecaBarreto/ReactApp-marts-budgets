import React, { useState } from "react"
import FormRow from '../../../utils/FormRow'

import { signInService } from '../../../../services/mart-login-service'

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

export default ({setLoading, inputs, errors, setErrors, handleInputs, toggleMode, onError, clearInputs, onSuccess}) =>{

    const [ sending, setSending ] = useState(true)
    
    const submit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await signInService(inputs)
            clearInputs()
            setErrors({})
            onSuccess && onSuccess()
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
                <input value={credentials} type="text" onInput={e=>handleInputs('credentials',e.target.value)}></input>
            </FormRow>
            <FormRow label="Senha de acesso" error={errors?.['password']}>
                <input value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
            </FormRow>

            <button onClick={submit} 
                className={`una-login-form-button ${ sending ? 'loading': 'false' }`} > 
                entrar
            </button>
            
            <button className="light-button" onClick={toggleMode}> Me Cadastrar</button>

        </form>
    )
}