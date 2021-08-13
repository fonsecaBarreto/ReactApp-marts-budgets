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

                <input style={{paddingLeft: 12}} type="text" value={queries.product_name} onInput={handleInput} onKeyDown={handleKeyDown}
                placeholder={"Nome do Item, Produto ou EAN"}></input>

                <button  onClick={toSearch} > <BsSearch></BsSearch> 
                    <span className="desktop-only"> </span>
                </button>
            </div>
        </div>
    )
}