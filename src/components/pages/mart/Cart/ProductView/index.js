import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../services/utils-service'
import basketImage from '../../../../../assets/basket.png'

export default ({product}) =>{

    const [ image, setImage] = useState(null)
    useEffect(()=>{
        if(!product) return
        if(product?.image){ setImage(getFilePath(product.image,'mart'))
        }else{ setImage(basketImage) }
    },[product])

    return (
        <div className="product-info-view">
            <div className="piv-image-vp">
                <img src={image}></img> 
            </div>
            <ul>
                <li> <span> {product.item.label} - {product.description}
              
                 </span> </li>
                <li> <label> Apresentação: </label> <span> {product.presentation} </span> </li>
                <li> <label> Marca: </label> <span>  {product.brand.label} </span> </li>
                <li> <label> EAN: </label> <span>  {product.ean} </span> </li> 
 
            </ul>
        </div>
    )
}