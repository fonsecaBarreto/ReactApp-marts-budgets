import React from 'react'
import './style.css'
import { BsSearch } from 'react-icons/bs'

export default ({queriesState, toSearch }) =>{

    const { queries, setProductName } = queriesState

    const handleInput = (e) => {
        return setProductName(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {  toSearch() }
    } 

    return (

        
        <div className="akustb-product-name-search-input akustb-wrapper">   
            <label> Pesquise pelo produto </label>
            <div className=" akustb-row">

                <input type="text" value={queries.product_name} onInput={handleInput} onKeyDown={handleKeyDown}></input>

                <button  onClick={toSearch} > <BsSearch></BsSearch> 
                    <span className="desktop-only"> Buscar </span>
                </button>
            </div>
        </div>
    )
}