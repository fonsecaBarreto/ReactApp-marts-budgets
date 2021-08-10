import React, { useState } from 'react'
import './style.css'
import { FaTruck } from 'react-icons/fa'
import { RiEditBoxFill } from 'react-icons/ri'
import { withRouter } from 'react-router-dom'

import { FiEdit } from 'react-icons/fi'
export default withRouter(({ history, data }) =>{

    const { id, name, email, phone } = data

    const edit = () =>{  history.push(`/admins/providers/update?id=${id}`)  }
    return (
        <div className="provider-item">

            <div className="provider-item-icon" onClick={()=>{}}>
                <FaTruck></FaTruck>
            </div>

            <div className="provider-item-content">
                <span className="provider-item-info">{name}</span>
                <span className="provider-item-info">{email}</span>
                <span className="provider-item-info font-bold">{phone}</span>
            </div>

            <div className="provider-right">
                <button className="provider-opt-btn" onClick={edit}>
                    <FiEdit></FiEdit>
                </button> 
            </div>
            
        </div>
    )
})