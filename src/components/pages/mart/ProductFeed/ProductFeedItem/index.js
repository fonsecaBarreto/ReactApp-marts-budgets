import React from 'react'
import './style.css'
import { getFilePath } from '../../../../../services/utils-service'

import ProductDefaultImage from '../../../../../assets/basket.png'
import { createCoverageSummary } from 'istanbul-lib-coverage'
export default ({product}) =>{
    const {description, brand, category, presentation, image } = product
    return (
        <div className="product-feed-item">
            <div className="product-fi-image-vp">
                <img src={image ? getFilePath(image) : ProductDefaultImage}></img>
            </div>

            <span className="product-fi-description">
                {description}
            </span>
            <span className="product-fi-brand">
                { brand ? brand.label : "Sem Marca"}
            </span>
           {/*  <span className="product-fi-category">
                {category.label}
            </span> */}
        
      
         {/*    <button  className="product-fi-button" > Escolher </button>

         */}
        </div>
    )
}