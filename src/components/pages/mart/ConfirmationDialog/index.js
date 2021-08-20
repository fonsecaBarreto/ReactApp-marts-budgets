import React, { useEffect, useState } from 'react'
import './style.css'
import Dialog from '../../../utils/Dialog'
import { getFilePath } from '../../../../services/utils-service'
import basketImage from '../../../../assets/basket.png'
import LoadingComp from '../../../utils/LoadingComp'
import ViewRow from './ViewRow'
import ActionRow from './ActionRow'

export default ({ show, onClose, orderState, toOrder }) =>{
    const { data, sending} = orderState
    const { product } = data


    return (
        <Dialog show={show} onClose={onClose} title={sending ? "Enviando pedido..." : "Confirme a ordem!"}>

            { sending || !product ? <LoadingComp></LoadingComp>  :
          
                <div className="budget-product-confirmation-dialog">
                  
                    <ViewRow product={product}></ViewRow>
                    <ActionRow orderState={orderState} toOrder={toOrder}></ActionRow>
                </div>
            }
        </Dialog>
    )
}