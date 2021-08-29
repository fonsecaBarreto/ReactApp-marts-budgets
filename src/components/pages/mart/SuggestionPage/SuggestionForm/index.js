
import React, { useEffect, useState } from "react"
import './style.css'
import FormRow from "../../../../utils/FormRow"
import { FaTimes } from 'react-icons/fa'
const INITIAL_DATA = {
    description: "",
    quantity: 1
}

export const SuggestionFormState = () =>{

    const [ data, setData ] = useState([ { ...INITIAL_DATA }])
    const [ errors, setErrors ]= useState({})
    const [ loading, setLoading ] = useState(false)

    const add = () =>{
        setData(prev => ( [ ...prev, { ...INITIAL_DATA}  ]))
    }

    const removeByIndex = (index)=>{
        if(data.length == 1) return 
        setData(prev => {
            var list = [ ...prev ]
            list.splice(index,1)
            return ([ ...list ] ) 
        }) 
    }

    const handleInputs = (index, key, value) => {

        setData(prev => {
            var list = [ ...prev ]
            var inputsRow = list.find((j,i)=>(i===index))
            inputsRow[key] = value
            list.splice(index,1,inputsRow)
            return ([ ...list ] ) 
        }) 
    }

    const clearAll = () =>{ 
        setData([ {...INITIAL_DATA} ]); 
        setErrors({})
    }

    return {
        inputsState: { data, setData, handleInputs },
        errorsState: { errors, setErrors },
        loadingState: { loading, setLoading },
        clearAll,
        add,
        removeByIndex
    }
 
}


export default ({state, index}) =>{

    const { inputsState, errorsState, removeByIndex } =state
    const description = inputsState.data[index].description
    const quantity = inputsState.data[index].quantity
    const error = errorsState.errors?.items?.[index]
    return (
        <div className="suggestion-form-grid">
            <button className="soft-btn suggestion-form-grid-clode-btn" onClick={()=>removeByIndex(index)} > <FaTimes></FaTimes> </button>
            <FormRow className="suggestion-form-grid-input-row" label="Descreva o item:" error={error?.description} >
                <textarea type="text" value={description} onInput={e=>state.inputsState.handleInputs(index, 'description',e.target.value)}></textarea> 
            </FormRow>
            <FormRow className="suggestion-form-grid-input-row" label="Qtd.:" error={error?.quantity}>
                <input min={1} type="number" value={quantity} onInput={e=>state.inputsState.handleInputs(index, 'quantity',e.target.value)}></input> 
            </FormRow>
        </div>
    )
}