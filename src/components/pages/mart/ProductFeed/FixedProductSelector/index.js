import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../services/utils-service'
import basketImage from '../../../../../assets/basket.png'
import { makeOrder } from '../../../../../services/order-service'
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
const INITIAL_DATA = { 
    forecast: "",
    quantity: 0
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



export default ({product, data, handleInputs, clear}) =>{


    const dialogState = WarningState()
    const [ image, setImage] = useState(null)

    const { quantity, forecast } = data

    useEffect(()=>{
        if(!product) return
        if(product?.image){
            setImage(getFilePath(product.image,'mart'))
        }else{
            setImage(basketImage)
        }

    },[product])

    const toOrder = async () =>{
        try{

            const { id } = product
            await makeOrder({ product_id: id, forecast, quantity })
            dialogState.showSuccess("Pedido feito com sucesso!")
        }catch(err){
            console.log(err)
            switch(err.name){
                case "InvalidRequestBodyError" :  dialogState.showFailure("Forneça a quantidade e a previsão do pedido"); break;
                default: dialogState.showFailure(err.message)
            }
        }
    }


    return (
        <React.Fragment>

            {
                product &&
                <div className="fixed-product-selector">
                    <div className="fpscontainer app-container flex-row">

                        <div>
                            <img src={image}></img>
                        </div>
                        <div className="flex-column espec-column">

                            <span>
                                <span className="font-bold"> Especificação: </span>
                                {product.description}
                            </span>
                            <span>
                                <span className="font-bold"> Especificação: </span>
                                {product.presentation}
                            </span>
                            <span>
                                <span className="font-bold"> Marca: </span>
                                {product.brand.label}
                            </span>
            
                        </div>

                        <div className="budget-row">
                            <label> Qtd.
                                <input type="number" value={quantity} onInput={e=>handleInputs.setQuantity(e.target.value)}></input>
                            </label>

                            <label> Previsão de compra
                                <input type="date" id="start" name="trip-start" value={forecast}  onChange={e=>handleInputs.setForecast(e.target.value)}
                                    /* min="2018-01-01" max="2018-12-31" *//>
                            </label>

                            <button onClick={toOrder}> cotar</button>
                        </div>


                            <button onClick={clear}> Cancelar</button>
                    </div>
                </div>
            }

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </React.Fragment>
    )
}