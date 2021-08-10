import React, { useEffect, useState } from 'react';
import AdminForm from '../../../../utils/AdminForm';
import FormRow from '../../../../utils/FormRow';

const INITIAL_DATA = {
    id: null,
    name: "",
    email: "",
    phone: "",
    obs: "",
    cnpj: "",
    corporate_name: "",
    financial_email:"",
    responsible_name: ""
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



const RootForm = ({ inputs, errorsState}) =>{

    const { data, handleInputs } = inputs
    const { name, email, phone, obs, cnpj, corporate_name, financial_email, responsible_name } = data
    const { errors } = errorsState

    return (
        <AdminForm title={"Fornecedor"} columns={[6,4,2,4,2,3,3,6]}>

            <FormRow label="Nome da empresa *" error={errors?.['name']}>
                <input value={name || ''} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Razão social *" error={errors?.['corporate_name']}>
                <input value={corporate_name || ''} type="text" onInput={e=>handleInputs('corporate_name',e.target.value)}></input>
            </FormRow>

            <FormRow label="CNPJ *" error={errors?.['cnpj']}>
                <input value={cnpj || ""} type="text" onInput={e=>handleInputs('cnpj',e.target.value)}></input>
            </FormRow>

            <FormRow label="Nome do responsável *" error={errors?.['responsible_name']}>
                <input value={responsible_name || ""} type="text" onInput={e=>handleInputs('responsible_name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Telefone" error={errors?.['phone']}>
                <input value={phone || ""} type="text" onInput={e=>handleInputs('phone',e.target.value)}></input>
            </FormRow>

            <FormRow label="E-mail" error={errors?.['email']}>
                <input value={email || ""} type="text" onInput={e=>handleInputs('email',e.target.value)}></input>
            </FormRow>

            <FormRow label="E-mail financeiro" error={errors?.['financial_email']}>
                <input value={financial_email || ''} type="text" onInput={e=>handleInputs('financial_email',e.target.value)}></input>
            </FormRow>

            <FormRow label="Observações" error={errors?.['obs']}>
                <textarea value={obs || ""} onInput={e=>handleInputs('obs',e.target.value)}></textarea>
            </FormRow>

    </AdminForm>
    )
}

export default RootForm