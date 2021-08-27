import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../../services/utils-service'
import basketImage from '../../../../../../assets/basket.png'
import Dialog from '../../../../../utils/Dialog'

import OrderTable from '../OrderTable'
import OrdersGroupDialogview from './OrdersGroupDialogview'
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
                    <OrdersGroupDialogview group={group} ></OrdersGroupDialogview>
                </div>
                <div className="orderGroup-modal-metrics">
                    <label> Pedidos:
                        <input disabled type="text" style={{paddingLeft: 5}} value={orders.length}></input>
                    </label>

                    <label> Unidades:
                        <input disabled type="text" style={{paddingLeft: 5}} value={quantities}></input>
                    </label>
             
                </div>

                <div>
                    <OrderTable orders={orders}></OrderTable>
                </div>
            </div>  
        </Dialog>
    )
}