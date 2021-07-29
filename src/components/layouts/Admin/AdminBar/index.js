import React from 'react'
import  './style.css'
import AdminDropDown from '../AdminDropDown'
import { IoIosArrowBack, IoMdArrowDropright } from 'react-icons/io'

export default ({admin, pages, currentPage}) =>{

    const GetTitle = () =>{
        var page = pages.find(p=>p.to === currentPage)
        if(page) return page.title
        

        var title = ""
        if(!page){
            pages.map(p => {
                if(!p.subs) return
                const subs = p.subs.forEach(sp=>{ 
                    if(sp.to === currentPage){
                        title = 
                        <React.Fragment> { p.title}  <IoMdArrowDropright/>  {sp.title} </React.Fragment>
                    }
                    
                })
                
            })
        }

        
        return title

        
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