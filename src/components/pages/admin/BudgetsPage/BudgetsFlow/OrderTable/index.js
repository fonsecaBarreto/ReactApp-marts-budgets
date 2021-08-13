import React from  'react'
import './style.css'

export default ({orders}) =>{

    return (
    
        <div className="orders-table">

            <table  className="orders-table">
                <tr>
                    <th>Estabelecimento</th>
                    <th>Prvisão de compra</th>
                    <th>Realizado em</th>
                    <th>Quantidade</th>
                </tr>
               { 
                orders.map(o =>(
                    <tr>
                        <td>{o.mart.label}</td>
                        <td>{o.forecast}</td>
                        <td>{o.created_at}</td>
                        <td>{o.quantity}</td>
                    </tr>
                ))
               }
            </table> 
        </div>
    )
}