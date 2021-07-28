import React, { useState } from 'react'
import './style.css'
import { withRouter, Link} from "react-router-dom"
import { useSelector } from 'react-redux'

import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
export default withRouter(({children}) =>{

    const [ showMenu, setShowMenu ] = useState(false)
   /*  const { mart, admin } = useSelector(state => state.global) */
    return (
    <div id="admin-layout">

        <AdminHeader toggle={()=>setShowMenu(!showMenu)}></AdminHeader>

        <AdminMenu show={showMenu} onItemClick={()=> setShowMenu(false)}></AdminMenu>

        <main className="admin-content">
            {children}
        </main>
  
    </div>
    )
})