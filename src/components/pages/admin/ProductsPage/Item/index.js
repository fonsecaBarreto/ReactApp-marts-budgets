import React, { useState } from 'react'
import './style.css'

import { AiOutlineShop, AiOutlineBell, AiOutlinePaperClip } from 'react-icons/ai'

import { FiEdit } from 'react-icons/fi'
import { HiChevronDown } from 'react-icons/hi'

import { getFilePath } from '../../../../../services/utils-service'
import { Link } from 'react-router-dom'

export default ({data}) =>{

    const { id, description } = data
    return (
        <div className="product-item">

            <div className="product-item-row">

                <div className="ptr-image" onClick={()=>{}}>
                   
                </div>

                <span className="ptr-name">{description}</span>

                <div className="ptr-right">

                    <Link to={`/admins/products/update?id=${id}`} className="ptr-opt-btn">
                        <span className={'font-bold '}> 
                            <FiEdit></FiEdit> 
                        </span> 
                    </Link>
        
                </div>

            </div>

        </div>
    )
}