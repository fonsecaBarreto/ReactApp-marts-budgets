import React, { useEffect, useState } from  'react'
import './style.css'
import OrderRow from './OrderRow'
export default ({orders}) =>{

    const [ filtereds, setFiltereds ] = useState([])

    useEffect(()=>{
        if(orders?.length > 0 ){
            let copy = [...orders]
            setFiltereds(copy.reverse())
        }
    },orders)
    
    return (
        <div className="orders-table">
            {   filtereds.map((o,i) =>(
                <OrderRow order={o} key={i} index={i}></OrderRow>
            ))}
        </div>
    )
}