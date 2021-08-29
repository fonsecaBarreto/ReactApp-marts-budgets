import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../services/utils-service'
import basketImage from '../../../../../assets/basket.png'
import { AiOutlineTags } from 'react-icons/ai'
export default ({order, onClick}) =>{

    const [ image, setImage] = useState(null)
    const [ product, setProduct] = useState(null)

    useEffect(()=>{
        if(!order?.product) return

        setProduct(order.product)
        if(order?.product?.image){ setImage(getFilePath(order.product.image,'mart'))
        }else{ setImage(basketImage) }


    },[order, order?.product])

    return (
        <div className="latest-orders-view" onClick={()=>onClick(order.product)}>
        
            { product && 
                <React.Fragment>

                    <div>
                        <span className="muted small">{order.quantity}x</span>
                    </div>

                    <div >
                        <img src={image}></img> 
                    </div>
                    <div>
                        <ul>
                            <li> <span> {product.item?.label || ''}, {product.description} - {product.presentation}  </span> </li>  
                            <li>  <span> <AiOutlineTags></AiOutlineTags> {product?.brand.label} </span> </li> 
                            <li> <label className="muted smaller"> Previsto para: </label> <span className="muted smaller">  {new Date(order.forecast).toDateString()} </span> </li> 
                        </ul>
        
                    </div> 

                </React.Fragment>
            }
        </div>
    )
}