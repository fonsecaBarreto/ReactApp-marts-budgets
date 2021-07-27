import React, { useState } from "react"
import './style.css'
import FormRow from '../../../../utils/FormRow'
import StrictInfoRow from "./StrictInfoRow"
import { signUpService } from '../../../../../services/mart-login-service'
import { withRouter } from 'react-router-dom'
import InputMask from 'react-input-mask';

const INITIAL_SIGNUP_DATA = {
    name: "",
    email: "",
    cnpj_cpf: "",
    phone: "",
    annex: null,
    transfer_allowed: false
}

export const SignUpState = ( ) =>{

    const [ inputs, setInputs, ] = useState({ ...INITIAL_SIGNUP_DATA })
    const [ errors, setErrors ]= useState({})

    const setTransfer_allowed = (value) =>{
        return setInputs(prev => ({ ...prev, transfer_allowed: value }))
    }
    const handleInputs = (key,value) =>{ 
        setInputs(prev => ({  ...prev,  [key]:value  }))
    }

    const clearInputs = () => {
        return setInputs({ ...INITIAL_SIGNUP_DATA })
    }

    const setAnnex = (value) =>{
        setInputs( prev => ({...prev, annex: value }))
    }
    return { handleInputs, inputs, setInputs, setAnnex, errors, setErrors, clearInputs, setTransfer_allowed}
}

export default withRouter(( { setLoading, inputs, setAnnex, errors, setErrors, handleInputs, toggleMode, setTransfer_allowed, clearInputs, onSuccess, onError}) =>{

    const [ sending, setSending ] = useState(true)

    const submit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            //shouw remove all non number from phone if phone exists
            const result  = await signUpService(inputs)
            clearInputs()
            setErrors({})
            onSuccess && onSuccess(result)
        }catch(err){
            if(err.params) setErrors(err.params)
            onError && onError(err)
        }
        setLoading(false)
       
    }

    const { name, email, phone, cnpj_cpf, transfer_allowed, annex } = inputs

    return(

        <form className={`login-form signup-form`}>

            <FormRow label="Nome da empresa *" error={errors?.['name']}>
                <input value={name} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Email de Trabalho *" error={errors?.['email']}>
                <input value={email} type="text" onInput={e=>handleInputs('email',e.target.value)}></input>
            </FormRow>

            <FormRow label="Cnpj ou Cpf *" error={errors?.['cnpj_cpf']}>
                <input value={cnpj_cpf} type="text" onInput={e=>handleInputs('cnpj_cpf',e.target.value)}></input>
            </FormRow>

            <FormRow label="Telefone Celular" error={errors?.['phone']}>

                <InputMask className="text-input" mask="(99) 99999-9999" maskChar={" "} value={phone} onChange={e=>handleInputs('phone',e.target.value)}/>
               
            </FormRow>

            <StrictInfoRow value={transfer_allowed} setValue={setTransfer_allowed} 
                file={annex} onFile={setAnnex}></StrictInfoRow>

            <button onClick={submit} 
                className={`una-login-form-button ${ sending ? 'loading': 'false' }`} > 
                Cadastrar
            </button>

            <button className="light-button" onClick={toggleMode}> Ja Estou cadastrado </button>

        </form>
    )
})