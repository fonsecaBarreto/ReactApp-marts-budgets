import React, { useEffect, useState } from 'react'
import './style.css'

export default ({group}) =>{
  
    const { quantities, product, orders } = group
    const { id, description, presentation, brand, item, ean, sku} = product

    return (

  
        <div className="order-list-view-bottom">
         <span >  {id} </span> 
        </div>
       
      
    )
}