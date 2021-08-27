import './style.css'

import { AiFillEye } from 'react-icons/ai'
export default ({product, onClick}) =>{

    const { description, presentation, brand, distac } = product
    return (
        <div className={`picv-product-view  ${distac ? 'distac' : ''}`} onClick={()=>onClick(product)}>
            

            <div>
                <span>{description} - <span className="small muted">  {presentation} </span> </span>
    
                <span>{brand.label}</span>
            </div>
           {/*  <button className="picv-view-eye"> <AiFillEye></AiFillEye></button> */}
        </div>
    )
}
