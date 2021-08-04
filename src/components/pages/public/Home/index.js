import React, { useEffect, useRef, useState } from "react"
import './style.css'
import { withRouter } from 'react-router-dom'
export default withRouter(({history}) =>{
    const inicio = useRef()
    const sobre = useRef()
    const contato = useRef()
    useEffect(()=>{
     
        switch(history.location.hash){
            case "#sobre" : sobre.current.scrollIntoView({behavior: 'smooth'});break;
            case "#contato" : contato.current.scrollIntoView({behavior: 'smooth'});break;    
            default: inicio.current.scrollIntoView({behavior: 'smooth'});  
        }
      
    },[history.location, history.location.hash ])




    return (
        <div id="home-page">
            <div ref={inicio} id="home">

                <div className="app-container">
          
                </div>
            </div>
            <div ref={sobre} id="sobre"></div>
            <div ref={contato} id="contato"></div>
        </div>
    )
})