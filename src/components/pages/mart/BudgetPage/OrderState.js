import React, { useState } from "react"

const INITIAL_DATA = { 
    forecast: "",
    quantity: 1,
    product: null
}

export const OrderState = () =>{
    const [ sending, setSending ] = useState(false)
    const [ data, setData ] = useState(INITIAL_DATA)
    const setQuantity = (value) => setData(prev=>({...prev, quantity:value }))
    const setForecast = (value) => setData(prev=>({...prev, forecast:value }))
    const setProduct = (value) => setData(prev=>({...prev, product:value }))
    const clear = () =>{ setData(INITIAL_DATA) }
    const open  = (product) => { setData({...INITIAL_DATA, product}) }
    return { clear, open, data, handleInputs : { setQuantity, setForecast, setProduct}, sending, setSending}
}



