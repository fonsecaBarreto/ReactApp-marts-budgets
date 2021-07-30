import React, { useState } from 'react'
import './style.css'

import { AiOutlineShop, AiOutlineBell, AiOutlinePaperClip } from 'react-icons/ai'

import { FiEdit } from 'react-icons/fi'
import { HiChevronDown } from 'react-icons/hi'

import { getFilePath } from '../../../../../services/utils-service'
import { Link } from 'react-router-dom'

export default ({mart, onView}) =>{


    const [ show, setShow ] = useState(false)
    const { id, name, email, phone, cnpj_cpf, isActive, annex } = mart
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


                    <Link to={`/admins/marts/update?md=${id}`} className="mart-opt-btn">
                        <span className={'font-bold '}> 
                            <FiEdit></FiEdit> 
                        </span> 
                    </Link>

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


                    { annex && 
                        <a href={getFilePath(annex)} target='_blank' className="mart-item-info">
                            <span className={'font-bold '}>  <AiOutlinePaperClip></AiOutlinePaperClip> 
                                Anexo 
                            </span> 
                        </a>
                    }

                    
                </div>

            </div>
        </div>
    )
}