import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../../services/utils-service'
import basketImage from '../../../../../../assets/basket.png'
import Dialog from '../../../../../utils/Dialog'

import OrderTable from '../OrderTable'
import OrdersGroupListview from '../OrdersGroupListview'
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
                    <OrdersGroupListview group={group} singleView ></OrdersGroupListview>
                </div>
                <div className="orderGroup-modal-metrics">
                    <label> Total de pedidos :
                        <span style={{paddingLeft: 5}}>{orders.length}</span>
                    </label>
             
                </div>

                <div>
                    <OrderTable orders={orders}></OrderTable>
                </div>
            </div>  
        </Dialog>
    )
}