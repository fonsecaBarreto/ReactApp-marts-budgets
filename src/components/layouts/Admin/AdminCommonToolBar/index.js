import React from "react"
import './style.css'
export default ({children}) =>{

    return (
        <div className="admin-common-tool-bar">
            <div className="admin-common-tool-bar-content app-container">


                { children }
            </div>
        </div>
    )



}