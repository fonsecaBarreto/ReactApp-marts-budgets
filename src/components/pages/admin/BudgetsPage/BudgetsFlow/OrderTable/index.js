import React from  'react'
import './style.css'

export default ({orders}) =>{

    return (
    
        <div className="orders-table">

       
                <div className="oth">
                    <span>Estabelecimento</span>
                    <span>Prvisão de compra</span>
                    <span>Realizado em</span>
                    <span>Quantidade</span>
                </div>
               { 
                orders.map(o =>(
                    <div className="otb">
                        <span>{o.mart.label}</span>
                        <span>{o.forecast}</span>
                        <span>{o.created_at}</span>
                        <span>{o.quantity}</span>
                    </div>
                ))
               }

        </div>
    )
}