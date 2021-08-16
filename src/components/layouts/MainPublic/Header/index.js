import React, { useEffect, useState } from 'react'
import './style.css'

import { FaBars } from 'react-icons/fa'
import Logo from '../../../../assets/logo.svg'
import HeaderLink from './HeaderLink'
import { withRouter } from 'react-router-dom'

import { ImExit } from 'react-icons/im'
import { FaUserCircle } from 'react-icons/fa'

import { logoutService } from '../../../../services/mart-login-service'
export default withRouter(({toggleMenu, history, admin, mart}) => {


    const [colorFull, setColorFull] = useState(false)
    const [currentPage, setCurrentPage ] = useState(null)

    const goTo = (to) => {
        history.push(to)
    } 

    useEffect(()=>{ window.addEventListener("scroll", handleScroll);},[])

    const handleScroll=()=>{
        if (window.pageYOffset > 8) {setColorFull(true)
        }else{setColorFull(false)}
    }
    
    useEffect(()=>{
        if(["/home",'/home/'].includes(history.location.pathname) ){
            setCurrentPage(history.location.pathname+history.location.hash)
        }
        else{ setCurrentPage(history.location.pathname)}

    },[history.location])
      
      
    return (
        <header id="primary-header" className={colorFull? 'colorful': ''}>

            <div className="primary-header-content app-container">
            
                <section className="section-one">
                    <img className="ph-logo"  src={Logo} alt="logo"></img> 
                </section>
                
                <section className="section-two">
                    <nav className="desktop-only">
                   
                        <ul >
                            <HeaderLink to="/inicio" currentPage={currentPage}>Inicio</HeaderLink>
                            <HeaderLink to="/inicio/#objetivos" currentPage={currentPage}>objetivos</HeaderLink>
                            <HeaderLink to="/inicio/#sobre" currentPage={currentPage}>Sobre</HeaderLink>
                           {/*  <HeaderLink to="/inicio/#contato" currentPage={currentPage}>Contato</HeaderLink>  */}
                         {
                            mart ?
                                <React.Fragment>
                                
                                    {
                                        history.location.pathname !== "/marts/orcamento" ?
                                        <button className="mart-area-button" onClick={()=>goTo('/marts/orcamento')}> 
                                            <FaUserCircle></FaUserCircle>
                                            Area do Cliente
                                        </button> 
                                    :

                                        <button className="mart-area-button" onClick={logoutService}>
                                            <ImExit></ImExit>
                                        </button>
                                    }

                                </React.Fragment>
                            :
                            history.location.pathname !== "/login" &&
                            <button className="signup-button" onClick={()=>goTo('/login')}> cadastrar-se </button> 
                         } 

                        </ul>
                    </nav>
             
                    <button className="toggle-button mobile-only" onClick={toggleMenu} > <FaBars></FaBars> </button>
                </section>
        
            </div>
        </header>
    )
})