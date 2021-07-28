import React from 'react'
import { withRouter } from 'react-router-dom'
export default withRouter(({history, selected, children, icon, to, emitClick}) =>{
    const click = () =>{
        to && history.push(to)
        emitClick(to)
    }
    return (<li className={`adm-menu-item ${selected ? 'selected' : ''}`}onClick={click}> 
        <span className="admin-menu-ico">
            {icon && icon}
        </span>
        {children}
    </li>)
})