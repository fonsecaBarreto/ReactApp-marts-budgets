import React, { useEffect } from 'react'
import './style.css'
import Banner from '../../../../../assets/cardue.png'
import HeadLineCurve from '../../../../../assets/headline-curve.svg' 
import { useHistory } from 'react-router-dom'
export default () =>{

    const  history = useHistory()
    const goTo = () =>{
        return history.push('/login?v=signup')
    }
    return (
        <div id="head-line" >
            <div className="app-container">
               
                <div className="head-line-text-container">
                    <h1> A praticidade de comprar ao melhor preço</h1>
                    <h3> Uma plataforma digital para empresários reduzirem custos, conectando o comprador ao fornecedor, simplificando o processo de compras. </h3>
                    <button className="soft-btn" onClick={goTo}> Saiba mais</button>
                </div> 
                <img src={Banner}></img> 

            
            </div>
          {/*   <img className="headline-curve" src={HeadLineCurve}></img> */}
        </div>
    )
}