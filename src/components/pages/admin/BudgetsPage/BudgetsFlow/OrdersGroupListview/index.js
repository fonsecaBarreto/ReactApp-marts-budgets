import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../../services/utils-service'
import basketImage from '../../../../../../assets/basket.png'
import { Link } from 'react-router-dom'

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
    const { id, description, presentation, brand, item, ean, sku} = product

    return (

            <div className={`order-group-list-view ${singleView ? 'single' : ''}`} onClick={handleItemClick}>

                <img src={image}></img>

                <div className="flex-column">
                    <a href={`/admins/products/update?id=${id}`} target="_blank"> {item.label} -  {description} </a>

                    <span> {brand.label} </span>
                 
                    <label>
                        apresentação: <span> {presentation} </span>
                    </label>

                    <label>
                        EAN: <span > {ean} </span>
                    </label>

                </div>
                
                <span className="order-amount"> 
                    <span className="oa-c"> {quantities}  </span> unidades</span>
            
            </div>
      
    )
}