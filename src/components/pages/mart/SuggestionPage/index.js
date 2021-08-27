import React, { useEffect, useState } from "react"
import './style.css'
import SuggestionForm, { SuggestionFormState } from './SuggestionForm'
export default () =>{

    const state  = SuggestionFormState()
    const { inputsState, add } = state

    return (
        <div id="suggestion-page">

            <div className=" suggestion-page-container app-container">
                <section>
                    <h2> Bem Vindo ao Una Compras</h2>
                    <h3> dee-nos sugestões de até 05 produtos mais usados semanalmente pelo seu estabelecimento </h3>
                </section>
                <section>
                    {   
                        inputsState.data?.length > 0 && inputsState.data.map((j,i)=>{
                            return ( <SuggestionForm key={i} state={state} index={i}></SuggestionForm>)
                        })
                    }
                    <button onClick={add} > +</button>
                </section>

            </div>
       
        </div>
    )
}