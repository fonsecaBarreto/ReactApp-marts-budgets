import React, { useEffect, useState } from 'react'
import './style.css'
import './utils.css'
import { withRouter, Link} from "react-router-dom"
import { useSelector } from 'react-redux'

import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminBar from './AdminBar'


import { IoMdArrowDropright } from 'react-icons/io'
import { MENU_STRUCT } from './ADMINS_PAGES'

export const PagesState = ( pages ) =>{
    const [ backRoute, setBackRoute ]  = useState('/admins/panel')
    const [ title, setTitle ]  = useState('Una Compras - Sistema Administrativo')
    const setConfig = (currentPage) =>{
        var page = pages.find(p=>p.to === currentPage)
        var title = page ? page.title : ""
        let backroute = page?.back ? page.back : "/admins/panel"
        if(!page){
            pages.map(p => {
                if(!p.subs) return 
                p.subs.forEach(sp=>{ 
                    if(sp.to === currentPage){
                        if (sp.back) backroute = sp.back
                        title =  (<React.Fragment> { p.title}  <IoMdArrowDropright/>  {sp.title} </React.Fragment>)
                    }
                }) 
            })
        }

        setBackRoute(backroute)
        setTitle(title)
    }
    return { title, backRoute, setConfig }
}


export default withRouter(({ history, children}) =>{

    const { mart, admin } = useSelector(state => state.global)

    const { title, backRoute, setConfig } = PagesState(MENU_STRUCT)

    const [ currentPage, setCurrentPage ] = useState(null)
    const [ showMenu, setShowMenu ] = useState(false)

    useEffect(()=>{
        setConfig(currentPage)
        setShowMenu(false)
    },[currentPage])

    const goBack = () => {
        return history.push(backRoute || '/admins/panel')
    }

    useEffect(()=>{
        if(!history.location) return 
        setCurrentPage(history.location.pathname) 
    },[history, history.location])

    return (
    <div id="admin-layout">

        <AdminHeader toggle={()=>setShowMenu(!showMenu)}  title={title} goBack={goBack}></AdminHeader>

        <AdminBar title={title} goBack={goBack} ></AdminBar>

        <AdminMenu pages={MENU_STRUCT} currentPage={currentPage} show={showMenu}></AdminMenu>

        <main className="admin-content">
            {children}
        </main>
  
    </div>
    )
})