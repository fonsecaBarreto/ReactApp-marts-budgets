import React from 'react'
import  './style.css'
import AdminDropDown from '../AdminDropDown'
import { IoIosArrowBack } from 'react-icons/io'

export default ({admin, pages, currentPage}) =>{

    const GetTitle = () =>{
        const page = pages.find(p=>p.to === currentPage)
        if(!page) return ""
        return page.title
    }
    return (
        <div className="admin-bar app-padding"> 
    
                <section className="admb-left"> 
                    <button className="admb-back-btn"> 
                        <IoIosArrowBack></IoIosArrowBack>
                    </button>
                    <span className="admb-title"> {GetTitle() }</span>
                
                </section>

                <section className="admb-right">
                    <AdminDropDown admin={admin}></AdminDropDown>
                </section>
          
   
        </div>
    )
}