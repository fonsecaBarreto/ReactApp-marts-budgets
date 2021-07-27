import React from "react"
import './style.css'
import { AiOutlinePlus } from 'react-icons/ai'
export default ({filters, setFilters, onAdd}) => {
    const { text } = filters

    const handleInput = (e) => {
        setFilters( prev => ({...prev,text: e.target.value}))
    }

    return (
        <div className="control-bar app-container">
            <button className="control-bar-btn" onClick={onAdd}> 
                <AiOutlinePlus></AiOutlinePlus>
             </button>
            <input style={{paddingLeft: 10}} value={text} className="control-bar-search" onInput={handleInput} placeholder='Nome, Telefone ou Email'></input>
        </div>
    )
}