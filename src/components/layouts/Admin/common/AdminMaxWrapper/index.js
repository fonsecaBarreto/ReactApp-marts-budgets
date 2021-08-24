import React from 'react'
import './style.css'
export default ({children}) =>{
    return (
        <div className="admin-max-wrapper">
       
        { 
            React.Children.map(children, (x,i) =>{

                if(i > 2 ) return undefined ;

                return (<section className={`mx-wrapper-${i === 0 ? 'header' : i === 1 ? 'body' : i === 2 ? 'footer' : ''}`}> {x}</section>)      
            })
        } 
               
        </div>
    )
}