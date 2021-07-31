import React, { useState } from 'react'
import './style.css'
import { FiEdit } from 'react-icons/fi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { withRouter } from 'react-router-dom'

import { BsThreeDotsVertical } from 'react-icons/bs'
export default withRouter(({history, data}) => {

    const [ showbtns, setShowBtns ] = useState(false)
    const add = () =>{
        history.push(`/admins/categories/create?cs=${data.id}`) 
     }
 
    const edit = () =>{
         history.push(`/admins/categories/update?cd=${data.id}`) 
    }

    const closeBtns  = () =>{
        if(showbtns) return setShowBtns(false);
    }

    return (
        <div className="category-tree-item">
            <span className="category-tree-item-name"> {data.name}</span>

            <div className="flex-row" onMouseLeave={closeBtns}>
                <button className="cti-btn" onClick={()=>setShowBtns(!showbtns)} > <BsThreeDotsVertical></BsThreeDotsVertical> </button>
                {
                    showbtns && 
                        <React.Fragment>
                            <button className="cti-btn" onClick={add}> <IoMdAddCircleOutline></IoMdAddCircleOutline> </button>
                            <button className="cti-btn" onClick={edit}> <FiEdit></FiEdit> </button>
                        </React.Fragment>
                }
            </div>
        </div>
    )
})