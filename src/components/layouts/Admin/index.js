import React, { useEffect, useState } from 'react'
import './style.css'
import { withRouter, Link} from "react-router-dom"
import { useSelector } from 'react-redux'

import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminBar from './AdminBar'


import { AiFillShop, AiTwotoneShopping, AiFillDashboard} from 'react-icons/ai'
import { FaArchive, FaTruck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'

const ADMIN_PAGES = [

    {
        title: "Painel",
        icon: <AiFillDashboard></AiFillDashboard>,
        to: "/admins/panel"
    },
    {
        title: "Estabelecimentos",
        icon: <AiFillShop></AiFillShop>,
        to: "/admins/marts"
    },
        {
            title: "Cadastrar novo estabelecimento",
            icon: <AiFillShop></AiFillShop>,
            to: "/admins/marts/create",
            hideMenu: true
        },
    {
        title: "Produtos",
        icon: <AiTwotoneShopping></AiTwotoneShopping>,
        to: "/admins/products"
    },
    {
        title: "Fornecedores",
        icon: <FaTruck></FaTruck>,
        to: "/admins/providers"
    },
    {
        title: "Orçamentos",
        icon: <CgNotes></CgNotes>,
        to: "/admins/budgets"
    },
]

export default withRouter(({ history, children}) =>{

    const { mart, admin } = useSelector(state => state.global)
    const [ currentPage, setCurrentPage ] = useState(null)
    const [ showMenu, setShowMenu ] = useState(false)

    const handleClick = (to) =>{
        setShowMenu(false)
        setCurrentPage(to)
    }
    useEffect(()=>{
        if(!history.location) return 
        setCurrentPage(history.location.pathname) 
    },[history, history.location])

    return (
    <div id="admin-layout">

        <AdminHeader toggle={()=>setShowMenu(!showMenu)}></AdminHeader>

        <AdminBar pages={ADMIN_PAGES} currentPage={currentPage} ></AdminBar>

        <AdminMenu pages={ADMIN_PAGES} currentPage={currentPage} show={showMenu} onItemClick={handleClick} ></AdminMenu>

        <main className="admin-content">
            {children}
        </main>
  
    </div>
    )
})