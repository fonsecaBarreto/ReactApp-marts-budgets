import React, { useState } from 'react'
import { Children } from 'react'
import { useHistory } from 'react-router-dom'


import { logoutService } from '../../../../services/mart-login-service'


export default ({ label, to, children }) =>{

    const history  =useHistory()

    const click = () =>{
        if(to === "exit") return logoutService()
        history.push(to)
    }

    return (
    <li className={`main-menu-item`} > 
        <span  className="main-menu-item-row" onClick={click} >
            {children && children}
            <span> {label} </span>
        </span>
    </li>)
}