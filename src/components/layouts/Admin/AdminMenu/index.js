import React, { useState } from 'react'
import './style.css'
import MenuItem from './MenuItem'
import { AiFillShop, AiTwotoneShopping, AiFillDashboard} from 'react-icons/ai'
import { FaArchive, FaTruck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import Logo from '../../../../assets/logo.svg'
import { MdSecurity } from 'react-icons/md'

export default ({pages, show, onItemClick, currentPage}) =>{


    return (<aside className={`admin-menu ${show ? 'show' : ''}`}>
        <nav>
            <div className="adm-layout-menu-logo desktop-only">
     
                <img src={Logo}></img>
                <span>
                     <MdSecurity></MdSecurity> 
                     Sistemas Administrativo </span>
            </div>
            <ul>

                {              
                    pages.map((p,i)=>{
                        if(!p.hideMenu) return (<MenuItem 
                            key={i}  to={p.to}  icon={p.icon}emitClick={onItemClick}
                            currentPage={currentPage}> {p.title}  </MenuItem>)
                    })
                }
      
            </ul>
        </nav>
 
    </aside>)
}