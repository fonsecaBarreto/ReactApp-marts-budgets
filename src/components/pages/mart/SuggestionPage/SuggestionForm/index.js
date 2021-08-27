
import React, { useEffect, useState } from "react"
import FormRow from "../../../../utils/FormRow"

const INITIAL_DATA = {
    description: "",
    quantity: 0
}

export const SuggestionFormState = () =>{

    const [ data, setData ] = useState([])
    const [ errors, setErrors ]= useState({})
    const [ loading, setLoading ] = useState(false)

    const add = () =>{
        setData(prev => [ ...prev, INITIAL_DATA ])
    }

    const handleInputs = (index, key, value) => {
        console.log("ok")
       setData(prev => {
            const copy = [ ...prev]
            var inputsRow = copy.find((j,i)=>(i==index))

            inputsRow[key] = value
            console.log(inputsRow)

            copy.splice(index, 1, inputsRow)
            return ([...copy] ) 

        }) 
    }

    const clearAll = () =>{ 
        setData([ ...INITIAL_DATA ]); 
        setErrors({})
    }

    return {
        inputsState: { data, setData, handleInputs },
        errorsState: { errors, setErrors },
        loadingState: { loading, setLoading },
        clearAll,
        add
    }
 
}


export default ({state, index}) =>{

    const { inputsState } =state
    const description = inputsState.data[index].description
    return (
        <div>
            {index}
            <FormRow label="nome">
                <input type="text" value={description} onInput={e=>state.inputsState.handleInputs(index, 'description',e.target.value)}></input> 
            </FormRow>
        </div>
    )
}