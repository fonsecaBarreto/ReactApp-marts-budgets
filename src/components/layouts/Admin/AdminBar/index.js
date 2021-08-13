import React, { useEffect, useState } from 'react'
import  './style.css'
import AdminDropDown from '../AdminDropDown'
import { IoIosArrowBack } from 'react-icons/io'


export default ({ admin, title, goBack }) =>{

    return (
        <div className="admin-bar app-padding"> 
    
                <section className="admb-left"> 
                    <button className="admb-back-btn" onClick={goBack}> 
                        <IoIosArrowBack></IoIosArrowBack>
                    </button>
                    <span className="admb-title"> {title}</span>
                
                </section>

                <section className="admb-right desktop-only">
                    <AdminDropDown admin={admin}></AdminDropDown>
                </section>
          
   
        </div>
    )
}