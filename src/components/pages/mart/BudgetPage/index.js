import React, { useState } from "react"
import './style.css'
import { withRouter } from 'react-router-dom'
import Content from '../Content'
import WarningDialog, { WarningState } from '../../../utils/WarningDialog'
import { OrderState } from './OrderState'
import Cart from "../Cart"
import OrderConfirmation from '../ConfirmationDialog'
import { makeOrder } from '../../../../services/order-service'
import MainFooter from '../../../layouts/MainPublic/Footer'
import { showFailure, showSuccess } from '../../../../store/reducers/dialog/actions'
import { useDispatch } from 'react-redux'
export default () =>{
    
    const dispatch = useDispatch()
    const [ showConfirmation, setShowConfirmation ] = useState(false)
    const dialogState = WarningState()
    const orderState = OrderState(dialogState)

    const handleSelectedItem = (product) =>{
        orderState.open(product)
    }

    const done = () =>{
        setShowConfirmation(true)
    }

    const toOrder = async () =>{

        const {setSending, clear, data } = orderState
        setSending(true)
         try{
            await makeOrder(data)
            setShowConfirmation(false)
            dispatch(showSuccess("Pedido feito com sucesso!","", "",()=>{
                clear() 
            }))
          
        }catch(err){
            switch(err.name){
                case "InvalidRequestBodyError" :  dispatch(showFailure("Forneça a quantidade e a previsão do pedido")); break;
                default: dispatch(showFailure(err.message))
            }
        }
        setSending(false)  
    } 


    return (
        <div id="budget-page">
        
            <section>
                <Content onItem={handleSelectedItem}></Content>
            </section>

            <aside>
                <Cart orderState={orderState} toOrder={done}></Cart> 
            </aside>

            <OrderConfirmation show={showConfirmation} onClose={()=>setShowConfirmation(false)} orderState={orderState} toOrder={toOrder}></OrderConfirmation>
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
            
        </div>
    )
}
