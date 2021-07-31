import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { BsDot }from 'react-icons/bs'


export const TestComp = ({data}) =>{
    return (
        <span> {data.name}</span>
    )
}


export const TreeViewRow = ({ component: Component, data, onSelected }) =>{
     const [ open, setOpen ] = useState(false) 
     const handleRadio = () =>{
        onSelected && onSelected({ name: data.name, id: data.id})
     }
     return ( 
         <div className={`tree-view-row ${data.root ? 'root' : 'child'}`}>
             <div className="tree-view-header">
                { (data.children && data.children.length > 0) ?
                  <button className="tree-view-decoration" onClick={()=>setOpen(!open)}>{ open ? <HiChevronUp/> : <HiChevronDown/>}</button>
                  : <span className="tree-view-decoration" > <BsDot></BsDot></span>
                }
                 {onSelected && <input type="radio" name="category_id" onChange={handleRadio}></input>}
                <Component data={ data }></Component>
             </div>
            { ( data && data.children && data.children.length > 0 ) &&
                <div className={`tree-view-body ${open ? 'show' : ''}`}>
                    <TreeView tree={data.children} component={Component} onSelected={onSelected}></TreeView>
                </div>
            }
         </div>
     )
 }


export default function TreeView({ tree, component: Component, onSelected }){
    if(!tree && tree.length === 0) return "Nada aqui"
    return (
        <div className="app-tree-view-tree">
            {   tree.map((c,i) => { return< TreeViewRow component={Component} data={c} key={i} onSelected={onSelected} ></TreeViewRow> })}
        </div>
    )
}


