import React from 'react'
import './style.css'
import BudgetRowComponent from './BudgetRowComponent'
import { FaTimesCircle } from 'react-icons/fa' 


export default ({ orderState, toOrder }) =>{

    const { data, clear, handleInputs } = orderState
    const { quantity, forecast, product } = data

    return (
        <div className="budget-row">
            <BudgetRowComponent label="Qtd.">
                <input type="number" value={quantity} onInput={e=>handleInputs.setQuantity(e.target.value)} min="1" ></input>
            </BudgetRowComponent>
            <BudgetRowComponent label="Previsão de compra">
                <input type="date" value={forecast}  onChange={e=>handleInputs.setForecast(e.target.value)}></input>
            </BudgetRowComponent>
            <BudgetRowComponent label="">
            < button onClick={toOrder}> cotar</button>
            </BudgetRowComponent>
            <BudgetRowComponent label="" >
            <   button onClick={clear} className="br-cancel"> 
                <FaTimesCircle></FaTimesCircle>
            </button>
            </BudgetRowComponent>
        </div>
    )
}