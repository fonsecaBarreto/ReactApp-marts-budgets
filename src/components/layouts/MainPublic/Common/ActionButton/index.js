import React from 'react'
import './style.css'
export default ({icon, label, onClick}) => {
    return (
        <button className="main-layout-action-btn" onClick={onClick}>

            {icon && icon} { label && label}
        </button>
    )
}