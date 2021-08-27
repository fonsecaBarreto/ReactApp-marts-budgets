import React, { useEffect, useState } from 'react'
import './style.css'
import { getFilePath } from '../../../../../../../services/utils-service'
import basketImage from '../../../../../../../assets/basket.png'
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

        <div className={`order-group-list-view-content`} >
                
            <section>   
           {/*       <img src={image}></img>  */}
               <button className="soft-btn" onClick={handleItemClick}> <AiFillFolderOpen></AiFillFolderOpen></button>  
            </section>
            <section>

                <a href={`/admins/products/update?id=${id}`} target="_blank"> {item.label} -  {description} - {presentation} </a>

                <label className="">
                    Marca: <span > {brand.label} </span>
                </label>

            </section>

            <section>
                <label className="oa-c"> <IoMdArrowDropright></IoMdArrowDropright> {quantities} <span> {`Unidade${orders.length > 1 ? 's' : ''}`} </span>    </label>
                <label className="oa-c"> <IoMdArrowDropright></IoMdArrowDropright>  {orders.length} <span>  {`Pedido${orders.length > 1 ? 's' : ''}`}  </span>   </label> 
            </section>
            

         {/*    <section>
                <button className="soft-btn" onClick={handleItemClick}> <AiFillFolderOpen></AiFillFolderOpen></button> 
            </section>  */}
        
        </div>
      
    )
}