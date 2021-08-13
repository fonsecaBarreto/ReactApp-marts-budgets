import React from 'react'
import './style.css'
import { FaBars }  from 'react-icons/fa'
import Logo from '../../../../assets/logo.svg'

import { IoIosArrowBack } from 'react-icons/io'
export default ({toggle, admin, title, goBack}) =>{
    return (
        <header className="admin-header">

            <div className="admin-header-content app-container">
            

                <button className="admb-back-btn" onClick={goBack}> 
                    <IoIosArrowBack></IoIosArrowBack>
                </button>
                <p>{title}</p>
           {/*      <img  className="admin-header-logo" src={Logo}></img> */}
                <button className="toggle-button mobile-only" onClick={toggle}> <FaBars></FaBars> </button>
            </div>
 
     
        </header>
    )
}