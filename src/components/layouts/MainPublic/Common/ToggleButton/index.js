import React from 'react'
import './style.css'
import { FaBars } from 'react-icons/fa'
export default ({onClick, icon}) =>{
    return (
        <button className="toggle-button mobile-only" onClick={onClick} >{  icon ? icon : <FaBars></FaBars>} </button>
    )
}