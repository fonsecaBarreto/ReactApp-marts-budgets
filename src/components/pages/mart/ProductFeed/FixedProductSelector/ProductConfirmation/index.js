import React, { useEffect, useState } from 'react'
import './style.css'
import Dialog from '../../../../../utils/Dialog'
import { getFilePath } from '../../../../../../services/utils-service'
import basketImage from '../../../../../../assets/basket.png'
export default ({ product, setProduct, toOrder }) =>{

    const [ image, setImage] = useState(null)
    useEffect(()=>{
        if(!product) return
        if(product?.image){
            setImage(getFilePath(product.image,'mart'))
        }else{
            setImage(basketImage)
        }

    },[product])

    return (
        <Dialog show={product} onClose={()=>setProduct(null)} title="Confirme a ordem!">
            <div className="budget-product-confirmation-dialog">
                {/* <h3>
                    Deseja prosseguir ? 
                </h3> */}
                <span></span>
                <div>
                    <img src={image}></img> 
                     <ul>
                        <li> <span> {product.item.label} - {product.description}</span> </li>
                        <li> <label> Apresentação: </label> <span >    {product.presentation}  </span> </li>
                        <li> <label> Marca: </label> <span>  {product.brand.label} </span> </li>
                        <li>  <label> EAN: </label> <span>  {product.ean} </span>  </li> 
                    </ul>
 
                </div>

                <div>
                    <button onClick={()=>setProduct(null)} className="cancel"> cancelar </button>
                    <button  onClick={toOrder}> confirmar </button>
                </div>
            </div>
        </Dialog>
    )
}