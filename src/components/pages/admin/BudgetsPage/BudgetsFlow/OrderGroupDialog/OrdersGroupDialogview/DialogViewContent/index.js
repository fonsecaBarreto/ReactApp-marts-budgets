import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../../../../services/utils-service'
import basketImage from '../../../../../../../../assets/basket.png'
import { IoMdArrowDropright } from 'react-icons/io'
import { AiFillFolderOpen } from 'react-icons/ai'

export default ({ group, onClick }) =>{
    const [image, setImage ] = useState(basketImage)
    useEffect(()=>{
        if(group?.product.image){  setImage(getFilePath(group.product.image)) }
    }, [group, group.product ])
    const handleItemClick = () =>{
        onClick && onClick(group)
    }

    const { quantities, product, orders } = group
    const { id, description, presentation, brand, item, ean, sku } = product

    return (

        <div className={`order-group-dialog-view-content`} >
                
            <section>   
                <img src={image}></img>  
            </section>
            <section>

                <a href={`/admins/products/update?id=${id}`} target="_blank"> {item.label} -  {description} </a>

                <label className="">
                    Apresentação: <span > {presentation} </span>
                </label>
                <label className="">
                    Marca: <span > {brand.label} </span>
                </label>
                <label className="">
                    EAN: <span > {ean || 'não cadastrado'} </span>
                </label>
                <label className="">
                    ID: <span > {id} </span>
                </label>

            </section>


        
        </div>
      
    )
}