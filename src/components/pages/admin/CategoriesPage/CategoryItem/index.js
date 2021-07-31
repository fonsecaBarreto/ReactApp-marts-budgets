import React from 'react'
import './style.css'
import { FiEdit } from 'react-icons/fi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { withRouter } from 'react-router-dom'
export default withRouter(({history, data}) => {


    const add = () =>{
        history.push(`/admins/categories/create?cs=${data.id}`) 
     }
 
     const edit = (id) =>{
         history.push(`/admins/categories/update?cd=${data.id}`) 
     }

    return (
        <div className="category-tree-item">
            <span className="category-tree-item-name"> {data.name}</span>

            <div className="flex-row">

                <button className="cti-btn" onClick={add}> <IoMdAddCircleOutline></IoMdAddCircleOutline> </button>
                <button className="cti-btn" onClick={edit}> <FiEdit></FiEdit> </button>
            </div>
        </div>
    )
})