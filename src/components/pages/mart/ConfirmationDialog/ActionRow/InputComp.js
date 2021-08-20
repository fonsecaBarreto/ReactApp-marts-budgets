import React from 'react'
import './style.css'

export default({label, children}) =>{
    return (

        <div className="confirm-action-comp">
           { label && <label>{label}</label>}
            {children}
        </div>
    )
}