import React, { useEffect, useState } from "react"
import './style.css'
import DefaultStateAdapter from "../utils/DefaultStateAdapter"
import LoginFormGrid from '../FormGrid'
import LoginFormRow from "../NewLoginFormRow"
import { HiSearchCircle } from 'react-icons/hi'
import { searchCep } from "../utils/SearchForCep"
import { UFS } from './UFS.json'

import InputMask from 'react-input-mask';

const INITIAL_ADDRESS_DATA ={
    address:"", 
    address_region: "", 
    address_number: "", 
    address_postalcode: "", 
    address_city: "",
    uf: "", 
    details:""
}

export const AddressFormState = () =>{
    return DefaultStateAdapter(INITIAL_ADDRESS_DATA)
}

export default ({ state }) =>{

    const {  inputsState, errorsState, loadingState, clearAll } =state
    const { data, setData, handleInputs } = inputsState
    const { errors, setErrors } = errorsState
    const { address, address_region, address_number, address_postalcode, address_city, uf, details} = data

    const handleCep = async (e) => {
        loadingState.setLoading(true)
        e.preventDefault()
        try{
            let data = await searchCep(address_postalcode)
            setErrors({})
            if(data.bairro)handleInputs('address_region',data.bairro);
            if(data.localidade)handleInputs('address_city',data.localidade);
            if(data.logradouro)handleInputs('address',data.logradouro);
            if(data.complemento)handleInputs('details',data.complemento);
            if(data.uf)handleInputs('uf',data.uf)
        }catch(err){
            setErrors(prev => ({ ...prev, address_postalcode: err.message }))
            console.log(err)
        }
        loadingState.setLoading(false)
    }


    return (

        <LoginFormGrid columns={[3,3,4,2]}>

            <LoginFormRow label="CEP *" error={errors?.['address_postalcode']} value={address_postalcode}> 

                <div className="cep-row">
                    <InputMask className="text-input" type={'text'}  placeholder={'CEP *'}  mask="99999-999"  disableUnderline
                        value={address_postalcode} 
                        onInput={e=> { handleInputs('address_postalcode',e.target.value) } }>    
                    </InputMask>
                    <button onClick={handleCep}> <HiSearchCircle></HiSearchCircle> </button>    
                </div>
            </LoginFormRow> 

            <LoginFormRow  label="UF *" error={errors?.['uf']}>
                <select value={uf} onChange={e=>handleInputs('uf',e.target.value)}>
                    {UFS.map(u=><option value={u.value}>{u.label}</option>)}

                </select>
            </LoginFormRow> 

            <LoginFormRow label="Logradouro *" error={errors?.['address']} >
                <input type={'text'} placeholder={'Exemplo: Rua Silva'}
                    value={address}  
                    onInput={e=>  handleInputs('address',e.target.value, true) } >
                </input>
            </LoginFormRow>  

            <LoginFormRow label="Numero *" error={errors?.['address_number']} >
                <input  type={'text'} placeholder={"Exemplo: 99"} 
                    value={address_number}  
                    onInput={e=> { handleInputs('address_number',e.target.value) } }>
                </input>
            </LoginFormRow>  

            <LoginFormRow  label="Bairro *" error={errors?.['address_region']}>
                <input type={'text'} placeholder={"Exemplo: Bairro das Flores"}
                    value={address_region}
                    onInput ={ e=> { handleInputs('address_region',e.target.value, true) }}> 
                </input>
            </LoginFormRow>

            <LoginFormRow label="Cidade *" error={errors?.['address_city']} > 
                <input type={'text'} placeholder={"Exemplo: Macaé"}
                    value={address_city}
                    onInput ={ e=> { handleInputs('address_city',e.target.value, true) }}> 
                </input>
            </LoginFormRow>  

            <LoginFormRow label="Complemento" error={errors?.['details']} > 
                <input type={'text'} placeholder={"Exemplo: Proximo a fármacia"}
                    value={details}
                    onInput ={ e=> { handleInputs('details',e.target.value, true) }}> 
                </input>
            </LoginFormRow>  

        </LoginFormGrid>

    )
}