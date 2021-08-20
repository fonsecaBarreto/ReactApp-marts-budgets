import React, { useState } from 'react'
import './style.css'
import { BsSearch } from 'react-icons/bs'
export const testComp = ({entry}) =>{
    return (<span className="text-black">{entry.name}</span>)
}
export default ({state}) =>{

    const handleInput = (e) => {
        state.setText(e.target.value)
 
    }
    const search = () => {
        state.loadFeed(0, false)
    }
    const handleKeys = (e) =>{
        if(e.key === "Enter") return search()
    }
    return (
        <div className="mart-budget-search-bar">
        
            <input className="mart-bsb-input" type="text" 
                placeholder="Pesquise pelo item desejado"
                value={state.queries.text} 
                onInput={handleInput} 
                onKeyDown={handleKeys}></input>
            <span className="float-bloom">
               <BsSearch></BsSearch>
            </span>

            <button onClick={search} className="mart-bsb-submit">
                Buscar
            </button>
    
        </div>
    )
}
