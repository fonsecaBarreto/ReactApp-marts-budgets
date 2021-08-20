import React, { useEffect, useState } from 'react'
import './style.css'

import { withRouter } from 'react-router-dom'
import Logo from '../../../../assets/logo2.svg'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiPhone } from  'react-icons/fi'
import { AiOutlineMail } from  'react-icons/ai'
export default withRouter(({toggleMenu, history, admin, mart}) => {

     
    return (
        <footer id="primary-footer" >

            <div className="footer-main-content app-container">
            
                <section> 
                    <img src={Logo} alt="logo"></img> 
                    
                </section>

                <section> 

                    <ul className="footer-contact">
                        <li> Rodovia amaral peixoto, 2511 - km 179 loja 01 - barra de macaé. Macaé-RJ. CEP 27973-030.</li>
                        <li> 
                            <span> <AiOutlineMail></AiOutlineMail> 
                                adm@unacompras.com.br </span>
                            <span> <FiPhone></FiPhone>(22) 99231-7557 </span>
                        </li>
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
                    <p >Copyright©2021, UnaCompras. Todos os direitos reservados.</p>
                </div>
            </div>

        </footer>
    )
})