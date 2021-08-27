import React, { useEffect, useState } from "react"
import './style.css'
import { withRouter, useHistory} from 'react-router-dom'
import Content from '../Content'
import WarningDialog, { WarningState } from '../../../utils/WarningDialog'
import { OrderState } from './OrderState'
import Cart from "../Cart"
import OrderConfirmation from '../ConfirmationDialog'
import { makeOrder } from '../../../../services/order-service'
import MainFooter from '../../../layouts/MainPublic/Footer'
import { showFailure, showSuccess } from '../../../../store/reducers/dialog/actions'
import { useDispatch, useSelector} from 'react-redux'
export default () =>{

    const { mart }  = useSelector(state=>state.global) 
    const history = useHistory()
    const dispatch = useDispatch()
    const [ showConfirmation, setShowConfirmation ] = useState(false)
    const dialogState = WarningState()
    const orderState = OrderState(dialogState)



    useEffect(()=>{
        if(!mart) return
        console.log(mart)
        if(mart?.checkList.first_suggestions == false){
            history.push('/marts/sugestao')
        }
    },[mart])


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
