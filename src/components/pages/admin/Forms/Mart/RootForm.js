import React, { useEffect, useState } from 'react';
import AdminForm from '../../../../utils/AdminForm';
import FormRow from '../../../../utils/FormRow';

const INITIAL_DATA = {
    updated_at: null,
    create_at: null,
    id: null,
    name: "",
    email: "",
    cnpj_cpf: "",
    phone: "",
    transfer_allowed: false,
    corporate_name:"",
    financial_email:"",
    responsible_name:"",
    obs:"",
}


export const FormState = () =>{
    const [ data, setData ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) => setData(prev => ({  ...prev,  [key]:value  }))

    const clearAll = () =>{ 
        setData({ ...INITIAL_DATA }); 
        setErrors({})
    }

    return {
        inputs: { data, setData, handleInputs },
        errorsState: { errors, setErrors },
        clearAll
    }
}


const RootForm = ({ inputs, errorsState, clearAll, children}) =>{

    const { data, handleInputs } = inputs
    const { name, email, cnpj_cpf, phone, transfer_allowed, corporate_name, financial_email, responsible_name, obs, updated_at, created_at } = data
    const { errors, setErrors } = errorsState

    return (
        <AdminForm title={"Estabelecimento"} columns={[6,4,2,4,2,3,3,6,6,6,6]} updated_at={updated_at} created_at={created_at}>

            <FormRow label="Nome da empresa *" error={errors?.['name']}>
                <input value={name || ''} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Razão social" error={errors?.['corporate_name']}>
                <input value={corporate_name || '' } type="text" onInput={e=>handleInputs('corporate_name',e.target.value)}></input>
            </FormRow>

            <FormRow label="CNPJ ou CPF *" error={errors?.['cnpj_cpf']}>
                <input value={cnpj_cpf || ''} type="text" onInput={e=>handleInputs('cnpj_cpf',e.target.value)}></input>
            </FormRow>

            <FormRow label="Nome do responsável *" error={errors?.['responsible_name']}>
                <input value={responsible_name || ''} type="text" onInput={e=>handleInputs('responsible_name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Telefone Celular" error={errors?.['phone']}>
                <input value={phone || ''} type="text" onInput={e=>handleInputs('phone',e.target.value)}></input>
            </FormRow>

            <FormRow label="Email de Trabalho *" error={errors?.['email']}>
                <input value={email || ''} type="text" onInput={e=>handleInputs('email',e.target.value)}></input>
            </FormRow>

            <FormRow label="Email Financeiro" error={errors?.['financial_email']}>
                <input  autoComplete="off" value={financial_email || ''} type="text" onInput={e=>handleInputs('financial_email',e.target.value)}></input>
            </FormRow>


            <FormRow label="Observações" error={errors?.['obs']}>
                <textarea value={obs || ""} onInput={e=>handleInputs('obs',e.target.value)}></textarea>
            </FormRow>

            <FormRow className="form-checkbox" error={errors?.['transfer_allowed']}>
                <input type="checkbox" checked={transfer_allowed} onChange={(e)=>handleInputs('transfer_allowed',!transfer_allowed)}></input>
                <label> Autorização pra re-envio </label>
            </FormRow>

            {children && children}

        </AdminForm>
    )
}

export default RootForm