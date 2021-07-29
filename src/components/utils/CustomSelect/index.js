import React, { useEffect, useState } from 'react'
import './style.css'

export default ({options, value, onInput, onNew}) => {
    const [ optionsList, setOptionsList ] = useState([])

    useEffect(()=>{
        setOptionsList([ { value:"", label:"Nenhum"}, ...options ])
    },[options])

    const handleChange = e => {
        console.log(e.target)
        return onInput && onInput(e.target.value)
    };

    return(<div className="custom-select">
        <button onClick={onNew}> Novo </button>
        <select onChange={handleChange}  value={value} defaultValue={""} >
            {optionsList.map((v,i)=>{
                return (<option key={i} value={v.value} >{v.label}</option>)
            })}
        </select> 
    </div>)
}