import React, { useState } from 'react'
import './style.css'
import { HiSearchCircle } from 'react-icons/hi'

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
        
        <div className="marts-budget-tool-bar-search-input">
        
            <input 
                type="text" 
                placeholder="Pesquise pelo item desejado"
                value={state.queries.text} 
                onInput={handleInput} 
                onKeyDown={handleKeys}></input>

            <button onClick={search}>
               <HiSearchCircle></HiSearchCircle>
            </button>
    
        </div>
    )
}