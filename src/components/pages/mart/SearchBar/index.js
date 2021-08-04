import React, { useState } from 'react'
import './style.css'
import AppSelectorfrom from '../../../utils/AppSelector'
import { MartslistCategoriesWithFilter } from '../../../../services/mart-product-search-service'
import AppSelector from '../../../utils/AppSelector'
export default ({state}) =>{
    const handleInput = (e) => {
        state.setText(e.target.value)
 
    }
    const search = () => {
        state.loadFeed()
    }
    const handleKeys = (e) =>{
        if(e.key === "Enter") return search()
    }
    return (
        <div className="mart-budget-search-bar">
       {/*          {JSON.stringify(state.queries)} */}

                <input type="text" value={state.queries.text} onInput={handleInput} onKeyDown={handleKeys}></input>
 
                <button onClick={search}> Procurar </button>

 
    
        </div>
    )
}