import React from  'react'
import { FiEdit } from 'react-icons/fi'


export default ({ selected, brand, onEdit, onSelection}) =>{
    const { name } = brand
    return (<div className={`brands-flow-item ${selected ? 'selected' : ''}`}>
        <span onClick={onSelection} className="bfi-name">{name}</span>
        <button className="editButton" onClick={onEdit}> <FiEdit></FiEdit> </button>
    </div>)
}