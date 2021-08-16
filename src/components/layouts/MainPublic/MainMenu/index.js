import React, { useEffect, useState } from 'react'
import './style.css'
import MenuItem from './MenuItem'

import { ImExit } from 'react-icons/im'

import { FaTimes, FaUserCircle } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

const NAV = [
    {label: "Inicio", to:"/inicio"},
    {label: "Objetivos", to:"/inicio/#objetivos"},
    {label: "Sobre", to:"/inicio/#sobre"}
]

export default ({ show, toggleMenu, mart}) =>{
    const history = useHistory()

    const goTo = (to) => {
        history.push(to)
    } 
    return (
        <aside className={`main-menu ${show ? 'show' : ''}`}>
            <button className="soft-btn" onClick={toggleMenu}> <FaTimes></FaTimes> </button>
            <nav> <ul>       
                    
                <React.Fragment>
                    {
                    NAV.map((p,i)=>{
                        return (  <MenuItem { ...p} key={i} > </MenuItem>)
                    })}

                    
                   { 
                        mart ?
                            <React.Fragment>
                            
                                {
                                    history.location.pathname !== "/marts/orcamento" ?
                                    <MenuItem label={'Area do Cliente'} to="/marts/orcamento">
                                            <FaUserCircle></FaUserCircle> </MenuItem>
                                :
                                    <MenuItem label={'Sair'} className="mart-area-button" to={'exit'}>  <ImExit></ImExit> </MenuItem>
                                }

                            </React.Fragment>
                        :
                        history.location.pathname !== "/login" &&
                        <button className="signup-button" onClick={()=>goTo('/login')}> cadastrar-se </button> 
                    }
                </React.Fragment>
                

            </ul> </nav>
        </aside>
    )
}