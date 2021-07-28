import React from "react"
import './style.css'
import { AiOutlinePlus } from 'react-icons/ai'
export default ({filters, setFilters, onAdd}) => {
    const { text, status } = filters

    const handleInput = (e) => {
        setFilters( prev => ({...prev,text: e.target.value}))
    }

    const handleChange = e => {
        setFilters( prev => ({...prev, status: Number(e.target.value) }))
    };

    return (
        <div className="control-bar app-container">
          {/*   <button className="control-bar-btn" onClick={onAdd}> 
                <AiOutlinePlus></AiOutlinePlus>
             </button> */}

                <select onChange={handleChange} value={status} defaultValue={0} >
                    <option value={2}> Pendentes</option>
                    <option value={1}> Ativos</option>
                    <option value={0}> Todos </option>
                </select>
            <input style={{paddingLeft: 10}} value={text} className="control-bar-search" onInput={handleInput} placeholder='Nome, Telefone ou Email'></input>
        </div>
    )
}