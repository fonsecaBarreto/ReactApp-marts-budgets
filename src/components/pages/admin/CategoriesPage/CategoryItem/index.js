import React, { useState } from 'react'
import './style.css'
import ChildrenItem from './CategoriesChildren'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

export default ({category}) =>{
    if(!category) return undefined

    const [ open, setOpen ] = useState(false)

    const { name, children } = category
    return (
        <div className="category-item">

            <div className="category-row">
                <button className="category-arrow" onClick={()=>setOpen(!open)}>
                    { !open ? <HiChevronDown/> : <HiChevronUp/> }
                </button>
                {name}
            </div>
            
            <div className={`category-body ${open ? "show" : ''}`}>
                { children.length > 0 ? children.map(c=>(
                    <ChildrenItem category={c}></ChildrenItem>
                )) : "Nenhuma Categoria aqui" }
            </div>

        </div>
    )
}