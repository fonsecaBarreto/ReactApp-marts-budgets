import React, { useState } from "react"
import './style.css'
import FormRow from '../../../../utils/FormRow'
import StrictInfoRow from "./StrictInfoRow"
import { signUpService } from '../../../../../services/mart-login-service'
import { withRouter } from 'react-router-dom'
import InputMask from 'react-input-mask';
import AddressForm from "../AddressForm/index.js"
import LoginFormRow, { MakeTextInput } from "../LoginFormRow"

const INITIAL_ADDRESS_DATA ={
    address:"", // rua
    address_region: "", // bairro
    address_number: "", //number
    address_postalcode: "", // 8
    address_city: "",
    uf: "", // (RJ, SP, MG)
    details:""
}

const INITIAL_SIGNUP_DATA = {
    name: "",
    email: "",
    cnpj_cpf: "",
    phone: "",
    annex: null,
    transfer_allowed: false,
    address: INITIAL_ADDRESS_DATA,
    responsible_name: ""
/*     financial_email: "",
    corporate_name: "", */
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

    const handleAddressInputs = (key,value) =>{ 
        setInputs(prev => ({  ...prev,  address:{...prev.address, [key]: value}  }))
    }

    const clearInputs = () => {
        return setInputs({ ...INITIAL_SIGNUP_DATA })
    }

    const setAnnex = (value) =>{
        setInputs( prev => ({...prev, annex: value }))
    }
    return { handleInputs, handleAddressInputs, inputs, setInputs, setAnnex, errors, setErrors, clearInputs, setTransfer_allowed}
}

export default withRouter(( { setLoading, inputs, setAnnex, errors, setErrors, handleInputs, handleAddressInputs, toggleMode, setTransfer_allowed, clearInputs, onSuccess, onError}) =>{

    const [ sending, setSending ] = useState(true)

    const submit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            const result  = await signUpService(inputs)
            setErrors({})
            onSuccess && onSuccess(result)
        }catch(err){
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            if(err.params) setErrors(err.params)
            onError && onError(err)
        }
        setLoading(false)
    }

    const { name, email, phone, cnpj_cpf, transfer_allowed, annex,
         responsible_name 
         /* financial_email,corporate_name  */} = inputs

    return(

        <form className={`login-form signup-form`}>

            <div className={`login-form-grid` }>

                <LoginFormRow label="Nome da Empresa *" error={errors?.['name']} placeholder="Nome"
                    input={MakeTextInput({value:name, onInput:e=>handleInputs('name',e.target.value)})} > </LoginFormRow>

                <LoginFormRow label="Pessoa responsável *" error={errors?.['responsible_name']}  placeholder="Responsável" 
                    input={MakeTextInput({value:responsible_name, onInput:e=>handleInputs('responsible_name',e.target.value)})} >
                </LoginFormRow>

                <LoginFormRow label="CNPJ ou CPF *" error={errors?.['cnpj_cpf']}  placeholder="Numero" 
                    input={MakeTextInput({value:cnpj_cpf, onInput:e=>handleInputs('cnpj_cpf',e.target.value)})} >
                </LoginFormRow>

                <LoginFormRow label="E-mail de Trabalho *" error={errors?.['email']}  placeholder="Exemplo: meuemail@mail.com" 
                    input={MakeTextInput({value:email, onInput:e=>handleInputs('email',e.target.value)})} >
                </LoginFormRow>

                <LoginFormRow label="Telefone Celular" error={errors?.['phone']} value={phone}>
                    <InputMask placeholder="Exemplo: (22) 9999-9999" className="text-input" mask="(99) 99999-9999" maskChar={" "} value={phone} onChange={e=>handleInputs('phone',e.target.value)}/>
                </LoginFormRow>

            </div>

            <span className="login-form-divider">   </span>

            <AddressForm inputs={inputs.address} onInput={handleAddressInputs} 
                errors={errors?.['address']}  setErrors={ (value) => setErrors(prev => ({...prev, address: value })) }>

            </AddressForm>

            <StrictInfoRow value={transfer_allowed} setValue={setTransfer_allowed} 
                file={annex} onFile={setAnnex}></StrictInfoRow>

            <button onClick={submit} className="una-login-form-button" >  Cadastrar  </button>

           <button className="light-button" onClick={toggleMode}> 
                Já sou Cadastrado </button> 

        </form>
    )
})



{/*

            <FormRow label="Telefone Celular" error={errors?.['phone']}>
                <InputMask placeholder="text" className="text-input" mask="(99) 99999-9999" maskChar={" "} value={phone} onChange={e=>handleInputs('phone',e.target.value)}/>
            </FormRow> */}

            
            {/* <FormRow label="E-mail financeiro" error={errors?.['financial_email']}>
                <input value={financial_email} type="text" onInput={e=>handleInputs('financial_email',e.target.value)}></input>
            </FormRow>
            
            <FormRow label="Razão social" error={errors?.['corporate_name']}>
                <input value={corporate_name} type="text" onInput={e=>handleInputs('corporate_name',e.target.value)}></input>
            </FormRow> */}