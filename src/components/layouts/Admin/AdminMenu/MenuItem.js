import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { BsArrowReturnRight } from 'react-icons/bs'
export default withRouter(({ history, title, subs, icon, to, selected }) =>{

    const [ show, setShow ] = useState(false)
    const click = (to, subs) =>{
        to && history.push(to)
        subs && setShow(!show)
  
    }
    return (
    <li className={`adm-menu-item ${selected ? 'selected' : ''}`} > 
        <span  className="adm-menu-item-row" onClick={()=>click(to, subs)} >
            <span className="admin-menu-ico"> {icon && icon}  </span>
            <span> {title} </span>
        </span>

        { (subs && subs.length > 0 ) &&
            
            <div className={`adm-menu-item-body ${show? 'show' : ""}`}>
                {subs.map((c,i)=>{
                    if(!c.hide) return (
                        <span className={`adm-menu-item-body-sub-item ${i == subs.length - 1 ? 'end' : ''} `}
                            key={i}  onClick={()=>click(c.to)} > 

                            {c.icon}{c.title}
                        </span>
                    )
                })}
            </div>
        }
    </li>)
})