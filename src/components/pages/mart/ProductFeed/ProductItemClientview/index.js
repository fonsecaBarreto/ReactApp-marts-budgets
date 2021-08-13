import React from 'react'
import './style.css'
import { useState } from "react"


import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle} from 'react-icons/io'


import ProductView from './ProductView'


export default ({item, onProduct}) =>{

    const [ hide, setHide ] = useState(false)
    const { name, products } = item
    return (
        <div className="product-item-client-view"> 
            <div className="picv-header">
                <button className="picv-hide-btn" onClick={()=>setHide(!hide)}>
                    { hide ? <IoMdArrowDroprightCircle></IoMdArrowDroprightCircle> :  <IoMdArrowDropdownCircle></IoMdArrowDropdownCircle>}
                </button>
                <span>{name}</span>
       
            </div>
            <div className={`picv-body ${hide ? 'hide' : ''}`} >
                {
                    ( products?.length > 0) && 
                    products.map((p,i)=>{
                        return <ProductView key={i} product={p} onClick={onProduct}></ProductView>
                    })
                }
            </div>
        </div>
    )
}