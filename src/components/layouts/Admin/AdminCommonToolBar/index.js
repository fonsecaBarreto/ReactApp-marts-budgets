import React from "react"
import './style.css'

export default ({children, className}) =>{

    return (
        <div className={`admin-common-tool-bar ${className}`}>
            <div className="admin-common-tool-bar-content ">
                { children } 
            </div> 
        </div>
    )



}