import React from 'react'
import './style.css'
export default ({product}) =>{
    const {description, brand, presentation} = product
    return (
        <div className="product-feed-item">
            {description}
            Marca:{brand},
            Apresentação:{presentation}
        </div>
    )
}