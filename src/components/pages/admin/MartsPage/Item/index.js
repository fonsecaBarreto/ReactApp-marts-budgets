import React, { useState } from 'react'
import './style.css'

import { AiOutlineShop, AiOutlineBell } from 'react-icons/ai'
import { HiChevronDown } from 'react-icons/hi'

export default ({mart, onView}) =>{


    const [ show, setShow ] = useState(false)
    const { name, email, phone, cnpj_cpf, isActive } = mart
    return (
        <div className="mart-item">

            <div className="mart-item-row">

                <div className="mart-item-icon" onClick={onView}>
                    <AiOutlineShop></AiOutlineShop>
                </div>
                <span className="mart-item-name">{name}</span>

                <div className="mart-right">

                     { isActive === false && 
                        <React.Fragment >
                            <span className="mart-status desktop-only" onClick={onView} > <AiOutlineBell></AiOutlineBell>  Aguardando </span>
                            <span className="bell-status mobile-only" onClick={onView}>  <AiOutlineBell></AiOutlineBell> </span>
                        </React.Fragment>
                     } 

                    <div className={`mart-item-arrow-btn ${show ? 'flip' : ''}`} onClick={()=>setShow(!show)}>
                        <HiChevronDown></HiChevronDown>
                    </div>
                </div>
            </div>

            <div className={`mart-item-body ${show ? 'show' : ''}`}>

                <div className={`mart-item-body-content`}>
                        
                    <span className="mart-item-info">
                        <span className={'font-bold '}> email: </span> {email} </span>

                    <span className="mart-item-info">
                        <span className={'font-bold '}> Telefone: </span> {phone} </span>

                    <span className="mart-item-info">
                        <span className={'font-bold '}> Cnpj/cpf: </span> {cnpj_cpf} </span>
                </div>

            </div>
        </div>
    )
}