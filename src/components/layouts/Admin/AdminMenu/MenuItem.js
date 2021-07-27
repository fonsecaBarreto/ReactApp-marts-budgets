import React from 'react'
import { withRouter } from 'react-router-dom'
export default withRouter(({history, children, icon, to}) =>{



    return (<li className="adm-menu-item" onClick={() => to && history.push(to)}> 
        <span className="admin-menu-ico">
            {icon && icon}
        </span>
        {children}
    </li>)
})