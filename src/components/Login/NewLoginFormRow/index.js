import React, { useState } from 'react'
import './style.css'

export default ( { className, label, error, children }) =>{
    const [ focused, setFocused ] = useState(false)
    
    return (
        <div className={`new-login-form-row ${className} ${error ? "warning" : ''}`} onFocus={() =>setFocused(true)} onBlur={()=>setFocused(false)}>
            <label>{label}</label> 
            { children && children }
            { error &&   <span className="new-login-form-error"> {error} </span>  }
        </div>
    )
}