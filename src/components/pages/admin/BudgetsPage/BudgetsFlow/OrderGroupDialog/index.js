import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../../services/utils-service'
import basketImage from '../../../../../../assets/basket.png'
import Dialog from '../../../../../utils/Dialog'

import OrderTable from '../OrderTable'

export default ({group, setGroup}) =>{
    const [image, setImage ] = useState(basketImage)

    useEffect(()=>{
        
        if(group?.product.image){
            setImage(getFilePath(group.product.image))
        }

    }, [group, group.product ])


    const { quantities, product, orders } = group
    const { description, presentation, brand, item } = product

    return (
        <Dialog show={group} onClose={()=>setGroup(null)}>
            <div className="orderGroup-modal">

                <div>
                    <img src={image}></img>
                    <div className="flex-column">
                        <span> {description} </span>
                        <span className="muted"> {item.label} </span>
                        <span className="muted smaller"> {presentation} </span>
                        <span> {brand.label} </span>
                    </div>
                    <span className="order-amount"> {quantities} </span>
                </div>


                <div>
                    
                    <OrderTable orders={orders}></OrderTable>
      
                </div>
            </div>  
        </Dialog>
    )
}