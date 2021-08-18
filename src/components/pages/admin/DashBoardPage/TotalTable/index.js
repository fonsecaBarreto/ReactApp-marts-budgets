import React from 'react'
import './style.css'
import Item from './TableItem'

import { AiFillShop } from 'react-icons/ai'
import { BiPackage} from 'react-icons/bi'
import { FaTruck } from 'react-icons/fa'

import { CgNotes } from 'react-icons/cg'
const ITEMS = [
    {
        image: <AiFillShop></AiFillShop>,
        label: "Clientes Cadastrados",
        value: 0,
        to: "/admins/marts"
    },
    {
        image: <BiPackage></BiPackage>,
        label: "Produtos Cadastrados",
        value: 0,
        to: "/admins/products"
    },
    {
        image: <FaTruck></FaTruck>,
        label: "Fornecedores Cadastrados",
        value: 0,
        to: "/admins/providers"
    },
    {
        image: <CgNotes></CgNotes>,
        label: "Orçamentos Realizados",
        value: 0,
        to: "/admins/budgets"
    },
]
export default ({ totalProducts, totalOrders, totalMarts, totalProviders }) =>{
    return (
        <div className="metrics-total-table">

            { ITEMS.map((j,i) =>{
                return (
                    <Item 
                        {...j} key={i}
                        value={
                            i === 0 ? totalMarts :
                            i === 1 ? totalProducts :
                            i === 2 ? totalProviders :
                            totalOrders
                         }
                    
                    
                    
                    ></Item>
                )
            })}
        </div>
    )
}