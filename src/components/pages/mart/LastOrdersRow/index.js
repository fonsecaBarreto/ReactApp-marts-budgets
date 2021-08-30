import React, { useEffect, useState } from 'react'
import './style.css'
import ListView from './LatestOrdersListView'
import { listLatests } from '../../../../services/marts/orders'
import { useSelector, useDispatch } from 'react-redux'
import { setLatestOrders } from '../../../../store/reducers/marts/actions'
import { FcRefresh } from 'react-icons/fc'
export default ({ onItem,  }) =>{
    const dispatch = useDispatch()
    const { latestOrders } = useSelector(state=>state.marts)
    useEffect(()=>{
        if(latestOrders.length == 0 ){
            listLatests().then((result)=>{
                dispatch(setLatestOrders(result))
            })
        }
    },[]) 
    return (
       
        <React.Fragment>

            { latestOrders?.length > 0 &&
                <div className="marts-budget-page-last-orders ">
                    <h4> <FcRefresh> </FcRefresh>Ultimos Orçamentos Realizados:</h4>
                    <div className="marts-budget-page-last-orders-vp">
                    <div className="marts-budget-page-last-orders-tray">
                    { latestOrders.map((o,i)=> { return ( <ListView key={i} order={o} onClick={onItem}></ListView> )  }) } 
                    </div> 
                    </div>
                
                </div>
            }
        </React.Fragment>
    )
    
}