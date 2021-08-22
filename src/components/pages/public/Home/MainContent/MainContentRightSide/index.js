import React from 'react'
import './style.css'
import { GiReceiveMoney, GiChoice } from 'react-icons/gi'
import { FiPackage } from 'react-icons/fi'
import { FaNetworkWired } from 'react-icons/fa'
import { MdMoneyOff } from 'react-icons/md'
import { RiDashboardLine } from 'react-icons/ri'
const items = [
    { icon:<GiReceiveMoney></GiReceiveMoney>, text: " A união de vários comércios possibilita aos membros da Una, comprar mais Barato."},
    { icon:<FiPackage></FiPackage>, text: "Isso é possível porque aumenta o volume de compras."},
    { icon:<FaNetworkWired></FaNetworkWired>, text: "Com um simples cadastro você tem acesso direto aos principais fornecedores."},
    { icon:<MdMoneyOff></MdMoneyOff>, text: "O uso da plataforma para cotação é livre de taxas. "},
    { icon:<GiChoice></GiChoice>, text: "Quem determina o produto a ser comprado, continua sendo você."},
    { icon:<RiDashboardLine></RiDashboardLine>, text: "Tenha suas cotações centralizadas em um sistema especializado, com histórico de preços e compras realizadas com diversos fornecedores."}


]

export default () =>{
    return (
        <div className="main-content-right-side">
            <ul>
                { items.map((j,i)=> (  
                    <li key={i}>
                        <span> {j.icon} </span>
                        {j.text}
                    </li>  
                ))  }
            </ul>    
          
        </div>
    )
}