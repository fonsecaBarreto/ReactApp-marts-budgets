import React, { useState } from 'react'
import './style.css'
import Header from './Header'
import Footer from './Footer'
import FloatMenu from './MainMenu'
import { useSelector } from 'react-redux'


export default function MainPublicLayout({children, fixedHeader}) {
    const { mart, admin } = useSelector(state=>state.global)
    const [ showMenu, setShowMenu ] = useState(false)

    const toggleMenu = () =>{
        setShowMenu(!showMenu)
    }
    
    return (
        <div id="primary-layout" className={`${fixedHeader ? 'fixedHeader': ''}`} >
          
            <Header admin={admin} mart={mart} toggleMenu={toggleMenu} ></Header>

            <FloatMenu show={showMenu} toggleMenu={toggleMenu}  mart={mart}></FloatMenu>

            <main id="primary-content" >
                {children}   
            </main>

            <Footer> </Footer>
      
        </div>
    )
}