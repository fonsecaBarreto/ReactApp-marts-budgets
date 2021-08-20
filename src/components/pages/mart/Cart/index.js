import React, { useEffect, useState } from 'react'
import './style.css'
import ProductView from './ProductView'
import OrdersTool from './OrdersTool'
export default ({ orderState, toOrder }) =>{

    const { data, clear  } = orderState
    const { quantity, forecast, product } = data

    return (
        <React.Fragment>
           {  product &&
                <div className="product-cart">
                    <section>
                        <ProductView product={product}></ProductView>
                  
                        <OrdersTool orderState={orderState} toOrder={toOrder}></OrdersTool>
                    </section>
                </div>
            }
        </React.Fragment>
        
    )
}