import React, { useState } from "react"
import './style.css'
import DefaultStateAdapter from "../utils/DefaultStateAdapter"
import LoginFormGrid from '../FormGrid'
import LoginFormRow from "../NewLoginFormRow"
import InputMask from 'react-input-mask';
import StrictInfoRow from './StrictInfoRow'

const INITIAL_SIGNUP_DATA = {
    name: "",
    email: "",
    cnpj_cpf: "",
    phone: "",
    transfer_allowed: false,
    responsible_name: ""
    // financial_email: "",
    // corporate_name: "", 
}

export const SignUpFormState = () =>{
    return DefaultStateAdapter(INITIAL_SIGNUP_DATA)
}


export default ({ state }) =>{

    const {  inputsState, errorsState, loadingState, clearAll } =state
    const { data, handleInputs } = inputsState
    const { errors } = errorsState
    const { name, email, phone, cnpj_cpf, transfer_allowed, responsible_name } = data

    return(

        <LoginFormGrid columns={[]}>

            <LoginFormRow label="Nome da Empresa *" error={errors?.['name']} >
                <input type={'text'} placeholder="Nome "
                    value={name} onInput={e=>handleInputs('name', e.target.value, true)}></input>
            </LoginFormRow>

            <LoginFormRow label="Pessoa responsável *" error={errors?.['responsible_name']} >
                <input type={'text'} placeholder="Exemplo: Lucas Fonseca"
                    value={responsible_name} onInput={e=>handleInputs('responsible_name', e.target.value, true)} >
                </input>
            </LoginFormRow>

            <LoginFormRow label="CNPJ *" error={errors?.['cnpj_cpf']} >
                <InputMask className="text-input" type={'text'} placeholder="Exemplo: 99.999.999/9999-99" mask="99.999.999/9999-99" 
                    value={cnpj_cpf} onInput={e=>handleInputs('cnpj_cpf', e.target.value)} >
                </InputMask>
            </LoginFormRow>

            <LoginFormRow label="E-mail de Trabalho *" error={errors?.['email']}>
                <input type={'text'} placeholder="Exemplo: meuemail@mail.com"
                    value={email} onInput={e=>handleInputs('email', e.target.value)} >
                </input>
            </LoginFormRow>

            <LoginFormRow label="Telefone Celular" error={errors?.['phone']} value={phone}>
                <InputMask className="text-input" placeholder="Exemplo: (22) 9999-9999" mask="(99) 99999-9999" maskChar={" "} value={phone} onChange={e=>handleInputs('phone',e.target.value)}/>
            </LoginFormRow>

            <StrictInfoRow value={transfer_allowed} setValue={v=>handleInputs('transfer_allowed', v)}></StrictInfoRow>
     
            {/* <span className="login-form-divider">   </span>

            <AddressForm inputs={inputs.address} onInput={handleAddressInputs} 
                errors={errors?.['address']}  setErrors={ (value) => setErrors(prev => ({...prev, address: value })) }>
            </AddressForm> 

            <span className="login-form-divider">   </span>

            
            <UploadsComp { ...uploadState } errors={errors}></UploadsComp>

            <span className="login-form-divider">   </span>


            <button onClick={submit} className="una-login-form-button" >  Criar Conta grátis  </button>

            <button className="light-button" onClick={toggleMode}> Já sou Cadastrado </button>  */}

        </LoginFormGrid>
    )
}
