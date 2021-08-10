import React, { useEffect, useState } from "react"
import './style.css'

import LoginFormRow, { MakeTextInput, MakeSelectInput } from "../LoginFormRow"

import { UFS } from '../UFS.json'
import { HiSearchCircle } from 'react-icons/hi'

export default ({inputs, errors, setErrors, onInput}) =>{

    const [addressErrors, setAddressErrors ] = useState({})
 
    const { address, address_region, address_number, address_postalcode, address_city, uf, details} = inputs

    useEffect(()=>{
        if(!errors)setAddressErrors({})
        if (typeof errors === "object"){
            setAddressErrors(errors)
        }

    },[errors])


    const searchCep = (e) => {
        e.preventDefault()
        const cep = address_postalcode
        if(!cep || cep.length < 8 || cep.length > 8)  return setErrors({address_postalcode:"Insira um CEP valido"});
           
        fetch(`http://viacep.com.br/ws/${cep}/json/`, { mode: 'cors'})
        .then((res) => res.json())
        .then((data) => {
            if (data.hasOwnProperty("erro")) {
                setErrors({address_postalcode:"Cep inválido"})
            } else {
                setErrors({})
                onInput('address_region',data.bairro)
                onInput('address_city',data.localidade)
                onInput('address',data.logradouro)
                onInput('details',data.complemento)
                onInput('uf',data.uf)
            }
        })
        .catch(err => console.log(err));
    
    }


    return (

        <React.Fragment>


            <div className="login-form-grid">

                <LoginFormRow className="c3" label="CEP *" error={addressErrors?.['address_postalcode']} value={address_postalcode} fixedLabel> 

                    <div className="cep-row">
                        <input  placeholder={'CEP *'} value={address_postalcode} type={'text'}  onInput={e=> { onInput('address_postalcode',e.target.value) } }>    
                        </input>
                        <button onClick={searchCep}> <HiSearchCircle></HiSearchCircle> </button>    

                    </div>
                </LoginFormRow> 

                <LoginFormRow className="c3" label="UF *" error={addressErrors?.['uf']}  fixedLabel
                    input={MakeSelectInput({value: uf, onInput: e=>{ onInput('uf',e.target.value)}, list: UFS   })}> 
                </LoginFormRow> 

                <LoginFormRow className="c4" label="Logradouro *" error={addressErrors?.['address']}
                    placeholder={"Exemplo: Rua Silva"}
                    input={MakeTextInput({value:address, onInput:e=> { onInput('address',e.target.value) }})} > </LoginFormRow> 

                <LoginFormRow className="c2" label="Numero *" error={addressErrors?.['address_number']}
                    placeholder={"Exemplo: 99"}
                    input={MakeTextInput({value:address_number, onInput:e=> { onInput('address_number',e.target.value) }})} > </LoginFormRow> 

                <LoginFormRow className="c6" label="Bairro *" error={addressErrors?.['address_region']}
                    placeholder={"Exemplo: Bairro das Flores"}
                    input={MakeTextInput({value:address_region, onInput:e=> { onInput('address_region',e.target.value) }})} > </LoginFormRow> 

                <LoginFormRow className="c6" label="Cidade *" error={addressErrors?.['address_city']}
                    placeholder={"Exemplo: Macaé"}
                    input={MakeTextInput({value:address_city, onInput:e=> { onInput('address_city',e.target.value) }})} > </LoginFormRow> 

                <LoginFormRow className="c6" label="Complemento " error={addressErrors?.['details']}
                    placeholder={"Exemplo: Proximo a fármacia"}
                    input={MakeTextInput({value:details, onInput:e=> { onInput('details',e.target.value) }})} > </LoginFormRow> 

            </div>

        </React.Fragment>
 
    )
}