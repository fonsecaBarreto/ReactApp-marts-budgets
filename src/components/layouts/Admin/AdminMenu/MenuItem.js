import React from 'react'
import { withRouter } from 'react-router-dom'
export default withRouter(({history, children, icon, to, emitClick, currentPage }) =>{
    const click = () =>{
        to && history.push(to)
        emitClick(to)
    }
    return (<li className={`adm-menu-item ${(currentPage) === to ? 'selected' : ''}`}onClick={click}> 
        <span className="admin-menu-ico">
            {icon && icon}
        </span>
        {children}
    </li>)
})