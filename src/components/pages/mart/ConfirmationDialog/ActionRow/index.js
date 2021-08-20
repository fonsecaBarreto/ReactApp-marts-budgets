import React from 'react'
import './style.css'

import InputComp from './InputComp'
export default ({ orderState, toOrder }) =>{


    const { data, handleInputs } = orderState
    const { quantity, forecast } = data
    return (
    
        <section className="confirm-item-action-row">

       
            <InputComp label="Qtd.">
                <input type="number" value={quantity} onInput={e=>handleInputs.setQuantity(e.target.value)} min="1" ></input>
            </InputComp> 

            <InputComp label="Previsão de compra">
                <input type="date" value={forecast}  onChange={e=>handleInputs.setForecast(e.target.value)}></input>
            </InputComp>

            <InputComp>
                <button onClick={toOrder} className="soft-btn" > confirmar </button>
            </InputComp> 
        </section> 
    )

}