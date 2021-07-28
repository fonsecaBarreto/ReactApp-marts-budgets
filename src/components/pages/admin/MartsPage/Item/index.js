import React, { useState } from 'react'
import './style.css'
import { joinService } from '../../../../../services/mart-service'
import { AiOutlineShop } from 'react-icons/ai'
import { HiChevronDown } from 'react-icons/hi'

export default ({mart}) =>{

    const join  = async () =>{
        try{
            await joinService(mart.id)
            alert("Feito")
        }catch(err){ alert(err.message)}
    }

    const [ show, setShow ] = useState(false)
    const { name, email, phone, cnpj_cpf, isActive } = mart
    return (
        <div className="mart-item">

            <div className="mart-item-row">

                <div className="mart-item-icon">
                    <AiOutlineShop></AiOutlineShop>
                </div>
                <span className="mart-item-name">{name}</span>

                <div className="mart-right">

                     { isActive === false && <span onClick={join} className="mart-status" > Aguardando </span> } 

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