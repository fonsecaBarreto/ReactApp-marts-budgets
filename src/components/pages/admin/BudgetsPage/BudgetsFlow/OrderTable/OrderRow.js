import React from 'react'
import { IoMdArrowDropright } from 'react-icons/io'

export default ({order, index}) =>{

    return (

        <div className="ot-order-row">

            <span >
                <span> {index + 1} </span>
                <IoMdArrowDropright></IoMdArrowDropright>
            </span>
            
            <div>
                <label> Cliente:
                        <span>{order.mart.label}</span>
                </label>   
                <label> realizada em:
                    <span >{new Date(order.created_at).toDateString()}</span>
                </label>   
                

                <label> Qtd.: 
                    <span>{order.quantity}</span>
                </label>
                <label> Previsão:
                    <span className="forecast-highlight" >{new Date(order.forecast).toDateString()}</span>
                </label>  

                <label> OS:
                    <span >{order.os}</span>
                </label> 
  
            </div>
        </div>
    )
}