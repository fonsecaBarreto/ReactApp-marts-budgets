import React from 'react'
import { IoMdArrowDropright } from 'react-icons/io'

export default ({order, index}) =>{

    return (

        <div className="ot-order-row">

            <span >
                {index + 1} <IoMdArrowDropright></IoMdArrowDropright>
            </span>
            <div>
                <label> Cliente
                        <span>{order.mart.label}</span>
                </label>   
                <label> realizada em:
                    <span >{new Date(order.created_at).toDateString()}</span>
                </label>   
            </div>
        
            <div>

                <label> Qtd.: 
                    <span>{order.quantity}</span>
                </label>
                <label> Previsão:
                    <span className="forecast-highlight" >{new Date(order.forecast).toDateString()}</span>
                </label>  
            </div>
        </div>
    )
}