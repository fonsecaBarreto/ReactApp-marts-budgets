import AdminForm from '../../../../utils/AdminForm'
import InputMask from 'react-input-mask';
import React, { useState, useEffect } from 'react';
import FormRow from '../../../../utils/FormRow'
import { saveMartService, findMartService, removeMartService } from '../../../../../services/mart-service'

const INITIAL_DATA = {
    /* update */
    id: null,
    name: "",
    email: "",
    cnpj_cpf: "",
    phone: "",
    transfer_allowed: false,
    /* create */
    password: "", 
    passwordConfirmation : "",
    /*  patch */
    image: null,
    annex: null,
}

export const PasswordForm = ({ inputs, handleInputs, errors, freeze }) =>{
    const { password, passwordConfirmation } = inputs
    return (
        <AdminForm title={"Segurança"} columns={[3,3]} loading={freeze} >

            <FormRow label="Senha" error={errors?.['password']}>
                <input value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
            </FormRow>

            <FormRow label="Confirmação de Senha " error={errors?.['passwordConfirmation']}>
                <input value={passwordConfirmation} type="password" onInput={e=>handleInputs('passwordConfirmation',e.target.value)}></input>
            </FormRow>

        </AdminForm>
    )
}

export const RootForm = ({ inputs, handleInputs, errors, freeze }) =>{
    const { id, name, email, cnpj_cpf, phone, transfer_allowed } = inputs
    return (
        <AdminForm title={"Geral"} columns={[6,6,6,6,6]} loading={freeze}>

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
                <input value={phone} type="text" onInput={e=>handleInputs('phone',e.target.value)}></input>
            </FormRow>

            <FormRow className="form-checkbox" error={errors?.['transfer_allowed']}>
                <input type="checkbox" checked={transfer_allowed} onChange={(e)=>handleInputs('transfer_allowed',!transfer_allowed)}></input>
                <label> Autorização pra re-envio </label>
            </FormRow>

        </AdminForm>
    )
}

export const MartState = () =>{
    const [ loading, setLoading ] = useState(false)
    const [ freeze, setFreeze ] = useState(false)
    const [ inputs, setInputs, ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) => setInputs(prev => ({  ...prev,  [key]:value  }))

    const clearInputs = (inputs = {}) => setInputs({ ...INITIAL_DATA, ...inputs })

    /* actions */

    const save = async () =>{
        setFreeze(true)
        try{
            const result = await saveMartService(inputs)
            clearInputs(result)
            setErrors({})
            return result
        } catch(err) {
            if(err.params) setErrors(err.params)
            throw err.message
        } finally {  setFreeze(false) } 
    }

    const load = async (id) =>{
        clearInputs()
        if(!id) return ;
        setLoading(true)
        try{
            const result = await findMartService(id)
            if(!result) throw { message: "Não foi possivel encontrar estabelecimento requerido"}
            setInputs(result)
        } catch(err) { throw err.message } 
        finally { setLoading(false) }
    }


    const remove = async (id) =>{
        if(!id) return;
        setLoading(true)
        try{ await removeMartService(id) } 
        catch(err) { throw err.message} 
        finally { setLoading(false) }
    }



    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs,   freeze, loading, save, load, remove }
}

