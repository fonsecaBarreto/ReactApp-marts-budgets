import React, { useEffect, useState } from 'react'
import './style.css'

import { makeOrder } from '../../../../../services/order-service'
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
import BudgetRow from './BudgetRow'
import ProductInfoView from './ProductInfoView'
import ProductConfirmation from './ProductConfirmation'
const INITIAL_DATA = { 
    forecast: "",
    quantity: 1
}


export const SelectorState = () =>{
    const [ data, setData ] = useState(INITIAL_DATA)
    const [ product, setProduct ] = useState(null)

    const setQuantity = (value) => setData(prev=>({...prev, quantity:value }))
    const setForecast = (value) => setData(prev=>({...prev, forecast:value }))

    const clear = () =>{
        setProduct( null)
        setData(INITIAL_DATA)
    }
    const open  = (product) =>{
        setProduct(product)
        setData(INITIAL_DATA)
    }

    return { product, setProduct, clear, open, data,  handleInputs : { setQuantity, setForecast} }
}



export default (props) =>{

    const [ aboutToBeOrdered, setOboutToBeOdered ] = useState(null)
    const { product, data, handleInputs, clear }  = props
    const dialogState = WarningState()

    const { quantity, forecast } = data


    const confirmOrder = () =>{
        return setOboutToBeOdered(product)
    }
    const toOrder = async () =>{
        try{
            const { id } = aboutToBeOrdered
            await makeOrder({ product_id: id, forecast, quantity })
            dialogState.showSuccess("Pedido feito com sucesso!")
            clear()
       
        }catch(err){
            console.log(err)
            switch(err.name){
                case "InvalidRequestBodyError" :  dialogState.showFailure("Forneça a quantidade e a previsão do pedido"); break;
                default: dialogState.showFailure(err.message)
            }
        }
        setOboutToBeOdered(null)

    }


    return (
        <React.Fragment>

            {
                product &&
                <div className="fixed-product-selector">
                    <div className="fpscontainer app-container">
                  
                        <ProductInfoView product={product}></ProductInfoView> 
                        <BudgetRow {...props } toOrder={confirmOrder}></BudgetRow>
                    </div>
                </div>
            }

           { aboutToBeOrdered && <ProductConfirmation product={aboutToBeOrdered} setProduct={setOboutToBeOdered} toOrder={toOrder}></ProductConfirmation>}
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </React.Fragment>
    )
}