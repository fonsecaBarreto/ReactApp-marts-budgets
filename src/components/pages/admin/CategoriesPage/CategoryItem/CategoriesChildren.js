import { BsArrowReturnRight } from 'react-icons/bs'

import { FiEdit } from 'react-icons/fi'

export default ({category, onEdit}) =>{
    if(!category) return undefined

    const { id, name } = category
    return (
        <div className="category-child-item">
            <BsArrowReturnRight></BsArrowReturnRight>
            {name}

            <button className="category-opt-btn" onClick={()=>onEdit(id)}>
                <FiEdit></FiEdit>
            </button> 
        </div>
    )
}