import React, { useEffect, useState } from 'react'
import './style.css'
import SuggestionForm from '../SuggestionForm'
import { FaInfoCircle } from 'react-icons/fa'

export default ({ state, mart }) =>{
    const { inputsState, errorsState, add } = state

    const [ firstSuggestions, setFirstSuggestions ] = useState(false)

    useEffect(()=>{
        if(mart?.checkList){
            setFirstSuggestions(mart.checkList.first_suggestions)
        }
    },[mart])


    return (
        <section>
            <h3>
                <FaInfoCircle></FaInfoCircle>
                 {
                firstSuggestions == false ? 'Abaixo, informe até 5 produtos mais usados semanalmente pelo seu estabelecimento. (opcional)'
                : "Abaixo, preenche os campos com os items que você gostaria de encontra em nosso sistema "
            
            }</h3>
            <div className="sug-list-flow">

                {   
                    inputsState.data?.length > 0 && inputsState.data.map((j,i)=>{
                        return ( <SuggestionForm key={i} state={state} index={i}></SuggestionForm>)
                    })
                }
            </div>
            { inputsState.data.length < 5 && <button onClick={add} className=" soft-btn suggestion-plust-add-btn"> +</button>}
        </section>
    )
}