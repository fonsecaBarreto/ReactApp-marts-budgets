import React, { useEffect, useState } from "react"
import './style.css'
import { withRouter, useHistory} from 'react-router-dom'
import Content from '../Content'
import WarningDialog, { WarningState } from '../../../utils/WarningDialog'
import { OrderState } from './OrderState'
import Cart from "../Cart"
import OrderConfirmation from '../ConfirmationDialog'
import RatingDialog from '../RatingDialog'
import { makeOrder } from '../../../../services/order-service'

import { showFailure, showSuccess } from '../../../../store/reducers/dialog/actions'
import { pushLatestOrders } from '../../../../store/reducers/marts/actions'
import { useDispatch, useSelector} from 'react-redux'
import LastOrdersRow from "../LastOrdersRow"
export default () =>{

    const [ sessionOrdersCount, setSessionOrdersCount ] = useState(0)
    const { mart }  = useSelector(state=>state.global) 
    const history = useHistory()
    const dispatch = useDispatch()
    const [ showConfirmation, setShowConfirmation ] = useState(false)
    const [ showRatingDialog, setShowRatingDialog] = useState(false)
    const dialogState = WarningState()
    const orderState = OrderState(dialogState)

    useEffect(()=>{
        let isMounted = true;    
        return () => { 
            isMounted = false 
        }; // cl
    },[])

    useEffect(()=>{
        if(!mart) return
        if(mart?.checkList.first_suggestions == false){
            history.push('/marts/sugestao')
        }
    },[mart])

    useEffect(()=>{
        if(sessionOrdersCount > 2){
            if(mart?.checkList.first_rating == false){
                setShowRatingDialog(true)
            }
        }
    },[sessionOrdersCount])

    const handleSelectedItem = (product) =>{
        orderState.open(product)
    }

    const done = () =>{ setShowConfirmation(true)  }

    const toOrder = async () =>{

        const {setSending, clear, data } = orderState
        setSending(true)
         try{
            const latestOrder = await makeOrder(data)
            setShowConfirmation(false)
            dispatch(showSuccess("Pedido feito com sucesso!","", "",()=>{
                setSessionOrdersCount(prev=>(prev + 1))
                dispatch(pushLatestOrders(latestOrder))
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
        
            <section className="app-padding">
                <LastOrdersRow onItem={handleSelectedItem}></LastOrdersRow>
                <Content onItem={handleSelectedItem}></Content>
            </section>

            <aside>
                <Cart orderState={orderState} toOrder={done}></Cart> 
            </aside>

            <OrderConfirmation show={showConfirmation} onClose={()=>setShowConfirmation(false)} orderState={orderState} toOrder={toOrder}></OrderConfirmation>
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
            <RatingDialog show={showRatingDialog} onClose={() => setShowRatingDialog(false)}></RatingDialog>
            
        </div>
    )
}
