import React from 'react'
import './style.css'

export default ({list, title, icon, innerComp: InnerComp}) =>{
    return (
        <div className="metrics-last-entities-flow">
           
            <h3> {title} </h3>
           <section>
               {list.map((j,i) =>{
                   return (
                       <Item { ...j} key={i} icon={icon} created_at={j.created_at}> 
                           <InnerComp { ...j}></InnerComp>
                       </Item>
                   )
               })}
           </section>
        </div>
    )
}

const Item = ({icon, created_at,  children}) =>{
    return (
        <div className="metrics-last-entities-item">
            <section>

                <div className="mlei-icon">
                    {icon}
                </div>

    
                {children}
          
            </section>
 
            <span> {new Date(created_at).toDateString()} </span>
        </div>
    )
}