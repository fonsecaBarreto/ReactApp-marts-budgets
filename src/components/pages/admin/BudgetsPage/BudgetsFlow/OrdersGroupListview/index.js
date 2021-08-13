import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../../services/utils-service'
import basketImage from '../../../../../../assets/basket.png'

export default ({group, onClick, singleView}) =>{
    const [image, setImage ] = useState(basketImage)

    useEffect(()=>{
        
        if(group?.product.image){
            setImage(getFilePath(group.product.image))
        }

    }, [group, group.product ])

    const handleItemClick = () =>{
        onClick && onClick(group)
    }

    const { quantities, product, orders } = group
    const { description, presentation, brand, item} = product

    return (

            <div className={`order-group-list-view ${singleView ? 'single' : ''}`} onClick={handleItemClick}>

                <img src={image}></img>

                <div className="flex-column">
                    <span> {item.label} -  {description} </span>
                    <span> {brand.label} </span>
                    <span className="muted small"> {presentation} </span>
                </div>
                
                <span className="order-amount"> 
                    <span className="oa-c"> {quantities}  </span> pedidos</span>
            
            </div>
      
    )
}