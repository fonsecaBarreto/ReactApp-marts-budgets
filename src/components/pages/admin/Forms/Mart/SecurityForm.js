import React, { useEffect, useState } from 'react';
import AdminForm from '../../../../utils/AdminForm';
import FormRow from '../../../../utils/FormRow';

const INITIAL_DATA = {
    password: "", 
    passwordConfirmation : "",
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


const RootForm = ({ inputs, errorsState, clearAll }) =>{

    const { data, handleInputs } = inputs
    const { password, passwordConfirmation} = data
    const { errors, setErrors } = errorsState

    return (
        <AdminForm title={"Segurança"} columns={[3,3]}>

            
            <FormRow label="Senha" error={errors?.['password']}>
                <input value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
            </FormRow>

            <FormRow label="Confirmação de Senha " error={errors?.['passwordConfirmation']}>
                <input value={passwordConfirmation} type="password" onInput={e=>handleInputs('passwordConfirmation',e.target.value)}></input>
            </FormRow>

        </AdminForm>
    )
}

export default RootForm