import React from 'react'
import './style.css'
const items = [
    " A união de vários comércios possibilita aos membros da Una, comprar mais Barato.",
    "Isso é possível porque aumenta o volume de compras.",
    "Com um simples cadastro você tem acesso direto aos principais fornecedores.",
    "O uso da plataforma para cotação é livre de taxas. ",
    "Quem determina o produto a ser comprado, continua sendo você.",
    "Tenha suas cotações centralizadas em um sistema especializado, com histórico de preços e compras realizadas com diversos fornecedores.",
]

export default () =>{
    return (
        <div className="main-content-right-side">
        

          
            <ul>

                {
                    items.map((j,i)=>(
                        <li key={i}>{j}</li>
                        ))
                    }
            </ul>    
          
        </div>
    )
}