import React, { useEffect, useState } from 'react'
import './style.css'

import { withRouter } from 'react-router-dom'
import Logo from '../../../../assets/logo2.svg'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
export default withRouter(({toggleMenu, history, admin, mart}) => {

     
    return (
        <footer id="primary-footer" >

            <div className="footer-main-content app-container">
            
                <section> 
                    <img src={Logo} alt="logo"></img> 
                    
                </section>

                <section> 

                    <ul className="footer-contact">
                        <li> Endereço</li>
                        <li> email | Telefone</li>
                    </ul>
                    <nav className="footer-social-nav">
                        <span className="social-icon"><FaInstagram></FaInstagram></span>
                        <span className="social-icon"><FaFacebookF></FaFacebookF></span>
                        <span className="social-icon"><FaWhatsapp></FaWhatsapp></span>
                    </nav>

                </section>
            </div>
            <div className="footer-consideration">
                <div className="app-container">
                <span >Copyright©2021, UnaCompras. Todos os direitos reservados.</span>
                </div>
            </div>

        </footer>
    )
})