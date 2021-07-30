import React, { useEffect, useState } from 'react'
import './style.css'
import { withRouter, Link} from "react-router-dom"
import { useSelector } from 'react-redux'

import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminBar from './AdminBar'


import { AiFillShop, AiTwotoneShopping, AiFillDashboard, AiOutlineUnorderedList, AiFillPlusCircle} from 'react-icons/ai'
import { FaArchive, FaTimes, FaTruck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import { RiPriceTag2Fill } from 'react-icons/ri'


const MENU_STRUCT = [

    {
        title: "Painel", to: "/admins/panel",
        icon: <AiFillDashboard></AiFillDashboard>,
    },
    {
        title: "Estabelecimentos",
        icon: <AiFillShop></AiFillShop>,
        subs: [
            {
                title: "Listagem",  to: "/admins/marts",
                icon: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
            },
            {
                title: "Adicionar",  to: "/admins/marts/create",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
            },
            {
                title: "Editar",  to: "/admins/marts/update",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                hide: true
            },
        ]
    },
    {
        title: "Produtos",
        icon: <AiTwotoneShopping></AiTwotoneShopping>,
        subs: [
            {
                title: "Listagem",  to: "/admins/products",
                icon: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
            },
            {
                title: "Categorias", to: "/admins/categories",
                icon: <RiPriceTag2Fill></RiPriceTag2Fill>,
            },
            {
                title: "Adicionar Categoria", to: "/admins/categories/create",
                icon: <RiPriceTag2Fill></RiPriceTag2Fill>,
                hide: true
            },
            {
                title: "Editar Categoria", to: "/admins/categories/update",
                icon: <RiPriceTag2Fill></RiPriceTag2Fill>,
                hide: true
            },
        ]
    },
    {
        title: "Fornecedores",
        icon: <FaTruck></FaTruck>,
        subs: [
            {
                title: "Listagem",  to: "/admins/providers",
                icon: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
           
            },
            {
                title: "Adicionar",  to: "/admins/providers/create",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
     
            },
            {
                title: "Editar",  to: "/admins/providers/update",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                hide: true
            },
        ]
    },
  
    {
        title: "Orçamentos",   to: "/admins/budgets",
        icon: <CgNotes></CgNotes>,
    },
]

export default withRouter(({ history, children}) =>{

    const { mart, admin } = useSelector(state => state.global)
    const [ currentPage, setCurrentPage ] = useState(null)
    const [ showMenu, setShowMenu ] = useState(false)

    const handleClick = (to) =>{
        setShowMenu(false)
       /*  setCurrentPage(to) */
    }
    useEffect(()=>{
        if(!history.location) return 
        setCurrentPage(history.location.pathname) 
    },[history, history.location])

    return (
    <div id="admin-layout">

        <AdminHeader toggle={()=>setShowMenu(!showMenu)}></AdminHeader>

        <AdminBar pages={MENU_STRUCT} currentPage={currentPage} ></AdminBar>

        <AdminMenu pages={MENU_STRUCT} currentPage={currentPage} show={showMenu} onItemClick={handleClick} ></AdminMenu>

        <main className="admin-content">
            {children}
        </main>
  
    </div>
    )
})