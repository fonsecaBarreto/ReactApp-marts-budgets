import React from 'react'
import './style.css'
import Item from './TableItem'

import { AiFillShop } from 'react-icons/ai'
import { AiOutlineInfoCircle, AiFillStar} from 'react-icons/ai'
import { BiPackage} from 'react-icons/bi'
import { FaTruck } from 'react-icons/fa'

import { CgNotes } from 'react-icons/cg'
const ITEMS = [
    {
        image: <AiFillShop></AiFillShop>,
        label: "Cliente",
        value: 0,
        to: "/admins/marts"
    },
    {
        image: <BiPackage></BiPackage>,
        label: "Produto",
        value: 0,
        to: "/admins/products"
    },
    {
        image: <FaTruck></FaTruck>,
        label: "Fornecedore",
        value: 0,
        to: "/admins/providers"
    },
    {
        image: <CgNotes></CgNotes>,
        label: "Orçamento",
        value: 0,
        to: "/admins/budgets"
    },
    {
        image: <AiOutlineInfoCircle></AiOutlineInfoCircle>,
        label: "Sugestõe",
        value: 0,
        to: "/admins/suggestions"
    },
    {
        image: <AiFillStar></AiFillStar>,
        label: "Avaliaçõe",
        value: 0,
        to: "/admins/rating"
    },
]
export default ({ totalProducts, totalOrders, totalMarts, totalProviders, totalSuggestions, totalRatings }) =>{
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
                            i === 3 ? totalOrders  :
                            i === 4 ? totalSuggestions  :
                            totalRatings
                         }

                    ></Item>
                )
            })}
        </div>
    )
}