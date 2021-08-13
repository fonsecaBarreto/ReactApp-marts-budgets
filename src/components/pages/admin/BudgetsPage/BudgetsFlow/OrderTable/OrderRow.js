import React from 'react'
import { AiFillShop } from 'react-icons/ai'

export default ({order}) =>{

    return (

        <div className="ot-order-row">

            <div className="desktop-only">
                <AiFillShop></AiFillShop>
            </div>

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