import React, { useState } from 'react'
import './style.css'
import SearchInput from './SearchInput/index' 
import { useHistory } from 'react-router-dom'

export default ({state}) =>{
    const history = useHistory()
    const goto = () =>{
        history.push("/marts/sugestao")
    }

    
    return (
        <div className="marts-budget-tool-bar">
            <section>

                <div>
                    <button className="suggestions-button soft-btn" onClick={goto}> Sugestões ? </button>
                </div>
                <SearchInput state={state}></SearchInput> 
            </section>

        </div>
    )
}
