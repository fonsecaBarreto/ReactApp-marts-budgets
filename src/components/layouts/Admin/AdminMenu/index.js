import React, { useState } from 'react'
import './style.css'
import MenuItem from './MenuItem'
import { AiFillShop, AiTwotoneShopping, AiFillDashboard} from 'react-icons/ai'
import { FaArchive, FaTruck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import Logo from '../../../../assets/logo.svg'
import { MdSecurity } from 'react-icons/md'



export default ({pages, show, onItemClick, currentPage}) =>{


    const isSelected = (page) => {
        if( page?.to === currentPage ) return true
        if( page?.subs ){
            const subsToList =page.subs.map(p=>(p.to))
            if(subsToList.includes(currentPage)) return true
        }
    }

    return (<aside className={`admin-menu ${show ? 'show' : ''}`}>
        <nav>
            <div className="adm-layout-menu-logo desktop-only">
     
                <img src={Logo}></img>
                <span>
                     <MdSecurity></MdSecurity> 
                     Sistemas Administrativo 
                </span>
            </div>
            <ul>
                {              
                    pages.map((p,i)=>{
                        if(!p.hide) return (
                        <MenuItem { ...p} key={i}  emitClick={onItemClick} selected={isSelected(p)}> </MenuItem>)
                    })
                }
      
            </ul>
        </nav>
 
    </aside>)
}