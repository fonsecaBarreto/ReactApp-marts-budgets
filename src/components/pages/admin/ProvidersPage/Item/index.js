import React, { useState } from 'react'
import './style.css'
import { FaTruck } from 'react-icons/fa'
import { RiEditBoxFill } from 'react-icons/ri'
export default ({provider, onView, onEdit}) =>{

    const { id, name, email, phone } = provider
    return (
        <div className="provider-item">


            <div className="provider-item-icon" onClick={onView}>
                <FaTruck></FaTruck>
            </div>

            <div className="provider-item-content">
                <span className="provider-item-info">{name}</span>
                <span className="provider-item-info">{email}</span>
                <span className="provider-item-info font-bold">{phone}</span>

            </div>


            <div className="provider-right">

                
                <button className="provider-opt-btn" onClick={()=>onEdit(id)}>
                    <RiEditBoxFill></RiEditBoxFill>
                </button> 

            </div>
            
        </div>
    )
}