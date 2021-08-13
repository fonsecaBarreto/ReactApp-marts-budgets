import React from  'react'
import './style.css'
import OrderRow from './OrderRow'
export default ({orders}) =>{

    return (
    
        <div className="orders-table">


               { 
                orders.map(o =>(
                    <OrderRow order={o}></OrderRow>
                
                ))
               }

        </div>
    )
}