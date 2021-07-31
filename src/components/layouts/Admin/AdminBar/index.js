import React, { useEffect, useState } from 'react'
import  './style.css'
import AdminDropDown from '../AdminDropDown'
import { IoIosArrowBack, IoMdArrowDropright } from 'react-icons/io'
import { withRouter } from 'react-router-dom'
export default withRouter(({ history, admin, pages, currentPage}) =>{

    const [ backRoute, setBackRoute ]  = useState('/admins/panel')
    const [ title, setTitle ]  = useState('Una Compras - Sistema Administrativo')

    useEffect(()=>{
      
        var page = pages.find(p=>p.to === currentPage)
        if(page) return page.title
        
        var title = ""
        let backroute = "/admins/panel"
        if(!page){
            pages.map(p => {
                if(!p.subs) return
                p.subs.forEach(sp=>{ 
                    if(sp.to === currentPage){
                        if (sp.back) backroute = sp.back
                        title =  (<React.Fragment> { p.title}  <IoMdArrowDropright/>  {sp.title} </React.Fragment>)
                    }
                }) 
            })
        }
        setBackRoute(backroute)
        setTitle(title)

    },[currentPage])



    const goBack = () => {
        return history.push(backRoute || '/admins/panel')
    }
    
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
})