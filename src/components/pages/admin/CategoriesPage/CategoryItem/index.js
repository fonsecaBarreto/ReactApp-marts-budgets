import React, { useState } from 'react'
import './style.css'
import ChildrenItem from './CategoriesChildren'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { FiEdit } from 'react-icons/fi'
export default ({category, onEdit }) =>{
    if(!category) return undefined

    const [ open, setOpen ] = useState(false)

    const { id, name, children } = category
    return (
        <div className="category-item">

            <div className="category-row">
                <button className="category-arrow" onClick={()=>setOpen(!open)}>
                    { !open ? <HiChevronDown/> : <HiChevronUp/> }
                </button>
                {name}
                <button className="category-opt-btn" onClick={()=>onEdit(id)}>
                    <FiEdit></FiEdit>
                </button> 
            </div>
            
            <div className={`category-body ${open ? "show" : ''}`}>
                { children.length > 0 ? children.map((c,i)=>(
                    <ChildrenItem category={c} key={i} onEdit={onEdit}></ChildrenItem>
                )) : "Nenhuma Categoria aqui" }
            </div>

        </div>
    )
}