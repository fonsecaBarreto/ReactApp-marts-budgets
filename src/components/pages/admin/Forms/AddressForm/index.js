import React, { useEffect, useState } from "react"
import './style.css'
import FormRow from "../../../../utils/FormRow"
import AdminForm from "../../../../utils/AdminForm"
import { UFS } from './UFS.json'
import { HiSearchCircle } from 'react-icons/hi'

const INITIAL_DATA = {
    id: null,
    address:"", // rua
    address_region: "", // bairro
    address_number: "", //number
    address_postalcode: "", // 8
    address_city: "",
    uf: "", // (RJ, SP, MG)
    details:""
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


export default ({ inputs, errorsState, clearAll }) =>{

    const { data, handleInputs } = inputs
    const { address, address_region, address_number, address_postalcode, address_city, uf, details} = data
    const { errors, setErrors } = errorsState

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
                handleInputs('address_region',data.bairro)
                handleInputs('address_city',data.localidade)
                handleInputs('address',data.logradouro)
                handleInputs('details',data.complemento)
                handleInputs('uf',data.uf)
            }
        })
        .catch(err => console.log(err));
    }

    return (

        <React.Fragment>


            <AdminForm title={"Endereço"} columns={[3,3,4,2,3,3,6]}>

                <FormRow label="CEP *" error={errors?.['address_postalcode']} value={address_postalcode} > 

                    <div className="cep-row">
                        <input  placeholder={'CEP *'} value={address_postalcode || ''} type={'text'}  onInput={e=> { handleInputs('address_postalcode',e.target.value) } }>    
                        </input>
                        <button onClick={searchCep}> <HiSearchCircle></HiSearchCircle> </button>    
                    </div>
                </FormRow> 

               <FormRow  label="UF *" error={errors?.['uf']} > 
                    <select value={uf || ''} onChange={e=>handleInputs('uf',e.target.value)}> 
                        { UFS.map((item, i)=>( <option key={i}value={item.value}>{item.label}</option> ))}
                    </select>
                </FormRow> 

                <FormRow label="Logradouro *" error={errors?.['address']} > 
                    <input value={address || ''} type="text" onInput={e=>handleInputs('address',e.target.value)}></input>        
                </FormRow> 

                <FormRow label="Numero *" error={errors?.['address_number']} > 
                    <input value={address_number || ''} type="text" onInput={e=>handleInputs('address_number',e.target.value)}></input>        
                </FormRow> 

                <FormRow label="Bairro *" error={errors?.['address_region']}> 
                       <input value={address_region || ''} type="text" onInput={e=>handleInputs('address_region',e.target.value)}></input>        
                </FormRow> 

                <FormRow label="Cidade *" error={errors?.['address_city']}>
                    <input value={address_city || ''} type="text" onInput={e=>handleInputs('address_city',e.target.value)}></input>    
                </FormRow> 

                <FormRow  label="Complemento " error={errors?.['details']} > 
                    <input value={details || ''} type="text" onInput={e=>handleInputs('details',e.target.value)}></input>
                </FormRow> 

                </AdminForm>

        </React.Fragment>
 
    )
}