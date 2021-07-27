import React from 'react'
import './style.css'
import { FaBars }  from 'react-icons/fa'
import Logo from '../../../../assets/logo.jpg'
export default ({toggle}) =>{
    return (
        <header className="admin-header">

            <div className="admin-header-content app-container">
            
                <img  className="admin-header-logo" src={Logo}></img>
                <button className="toggle-button mobile-only" onClick={toggle}> <FaBars></FaBars> </button>
            </div>
 
     
        </header>
    )
}