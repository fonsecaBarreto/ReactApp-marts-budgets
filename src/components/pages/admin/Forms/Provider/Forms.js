import AdminForm from '../../../../utils/AdminForm'
import React, { useState, useEffect } from 'react';
import FormRow from '../../../../utils/FormRow'
import { findProviderService, saveProviderService, removeProviderService } from '../../../../../services/provider-service'

const INITIAL_DATA = {
    id: null,
    name: "",
    email: "",
    phone: ""
}

export const RootForm = ({ inputs, handleInputs, errors, freeze }) =>{
    const { id, name, email, phone } = inputs
    return (
        <AdminForm title={"Fornecedor"} columns={[6,6,6,6,6]} loading={freeze}>

            <FormRow label="Nome" error={errors?.['name']}>
                <input value={name} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Email" error={errors?.['email']}>
                <input value={email} type="text" onInput={e=>handleInputs('email',e.target.value)}></input>
            </FormRow>

            <FormRow label="Telefone" error={errors?.['phone']}>
                <input value={phone} type="text" onInput={e=>handleInputs('phone',e.target.value)}></input>
            </FormRow>

        </AdminForm>
    )
}

export const ProviderState = () =>{

    const [ loading, setLoading ] = useState(true)
    const [ freeze, setFreeze ] = useState(false)
    const [ inputs, setInputs, ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) => setInputs(prev => ({  ...prev,  [key]:value  }))

    const clearInputs = (inputs = {}) =>{ setInputs({ ...INITIAL_DATA, ...inputs }); setErrors({})}

    const load = async (id) =>{
        setLoading(true)
        clearInputs()
        await Promise.all([
            id &&
            findProviderService(id)
            .then(result => {
                if(!result) throw { message: "Não foi possivel encontrar fornecedor requerido"}
                setInputs(result)
            }).catch(err => { throw err.message })
        ]).finally(()=>setLoading(false))
    }

    const save = async () =>{
        setFreeze(true)
        try{
            const result = await saveProviderService(inputs)
            clearInputs(result)
            setErrors({})
            return result
        } catch(err) {
            if(err.params) setErrors(err.params)
            throw err.message
        } finally {  setFreeze(false) } 
    }

    const remove = async (id) =>{
        if(!id) return;
        setFreeze(true)
        try{ await removeProviderService(id) } 
        catch(err) { throw err.message} 
        finally { setFreeze(false) }
    }


    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs, freeze, loading, save, load, remove }
}

