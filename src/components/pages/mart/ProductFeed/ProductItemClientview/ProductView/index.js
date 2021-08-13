import './style.css'

import { AiFillEye } from 'react-icons/ai'
export default ({product, onClick}) =>{

    const { description, presentation, brand } = product
    return (
        <div className="picv-product-view" onClick={()=>onClick(product)}>

            <span>{description}</span>
            <span>{presentation}</span>
            <span>{brand.label}</span>
           {/*  <button className="picv-view-eye"> <AiFillEye></AiFillEye></button> */}
        </div>
    )
}
