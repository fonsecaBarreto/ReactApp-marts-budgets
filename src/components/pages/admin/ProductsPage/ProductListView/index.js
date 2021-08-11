import React from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'

import { BsDot } from 'react-icons/bs'

export const ListProductView = ({product, index}) =>{
    const history = useHistory()
    const { id, description, brand, presentation} = product

    const update = (e) =>{
        e.preventDefault()
        history.push(`/admins/products/update?id=${id}`)
    }
    return (
        <div className="listing-product-view " onClick={update}>
            <span>{index}</span>
            <div> {description} </div>
            <div> {brand.label} </div>
            <div> {presentation} </div>
        </div>
    )
}