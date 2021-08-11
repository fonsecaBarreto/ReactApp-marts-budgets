import React, { useState } from 'react'
import './style.css'

import { FiEdit } from 'react-icons/fi'

import { getFilePath } from '../../../../../services/utils-service'
import { Link } from 'react-router-dom'
import { ListProductView } from '../ProductListView'

import { IoMdArrowDropright } from 'react-icons/io'


export default ({data}) =>{

    const { id, name, description, products } = data
    return (
        <div className="product-item">

            <div className="product-item-row">
                <span className="ptr-name"> <IoMdArrowDropright> </IoMdArrowDropright>   {name}</span>
                <div className="ptr-right">
                    <Link to={`/admins/items/update?id=${id}`} className="ptr-opt-btn">
                        <span className={'font-bold '}> 
                            <FiEdit></FiEdit> 
                        </span> 
                    </Link>
                </div>

            </div>
  
            <div className="product-item-body">

                <div className="product-item-body-flow">
                    {
                        !products?.length ?  <span className="muted small" style={{marginTop: 5}}> Nenhum produto aqui </span> :
                        products.map((p,i) =>{ return <ListProductView key={i} index={i} product={p}></ListProductView>})
                    }
                </div>
            </div>

        </div>
    )
}