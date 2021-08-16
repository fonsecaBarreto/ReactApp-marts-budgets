import React, { useEffect } from 'react'
import './style.css'
import Banner from '../../../../../assets/headline-truck.svg'
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
                    <h1> Torne-se um membro</h1>
                    <h3> Descubra as Vantagens de ser <span className="hashUna"> #Una </span> </h3>
                    <button className="soft-btn" onClick={goTo}> Cadastrar-se</button>
                </div> 
                <img src={Banner}></img> 

            
            </div>
          {/*   <img className="headline-curve" src={HeadLineCurve}></img> */}
        </div>
    )
}