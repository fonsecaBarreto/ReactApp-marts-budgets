import React, { useEffect, useRef, useState } from "react"
import './style.css'
import { withRouter } from 'react-router-dom'
import PerksRow from "./PerksRow"
import BecomeMember from "./BecomeMember"
import HeadLine from "./HeadLine"
import { CgEnter } from "react-icons/cg"

import LayoutFooter from '../../../layouts/MainPublic/Footer'
import MainContent from "./MainContent"
export default withRouter(({history}) =>{

    const inicio = useRef()
    const cadastro = useRef()
    const goals = useRef()
    const sobre = useRef()


    useEffect(()=>{
 
        let offset = 0
        var y = 0
        switch(history.location.hash){
            case "#inico" : {
                y = inicio.current.getBoundingClientRect().top + window.pageYOffset + offset;
            };break;

            case "#objetivos" :{
                offset = -150;
                y = goals.current.getBoundingClientRect().top + window.pageYOffset + offset;
            };break;
            case "#sobre" : {
                y = sobre.current.getBoundingClientRect().top + window.pageYOffset + offset;
             /*    contato.current.scrollIntoView({behavior: 'smooth'}) */
            };break;    
            case "#cadastro" : {
                offset = -90;
                y = cadastro.current.getBoundingClientRect().top + window.pageYOffset + offset;
            
            };break;   
            default: inicio.current.scrollIntoView({behavior: 'smooth'});  
        }

      

        window.scrollTo({
            top: y, 
            behavior: 'smooth'});


    },[history.location, history.location.hash ])

    return (
        <div id="home-page">

             <div ref={inicio} id="home">
                <HeadLine></HeadLine>
            </div>

            <div ref={cadastro}>
             <MainContent ></MainContent>
            
            </div>
            <div ref={goals} id="goals">
                <div className="app-container">
                    <PerksRow></PerksRow> 
                </div> 
            </div>

            <div ref={sobre}  id="sobre">
                <div className="app-container">
                    <BecomeMember></BecomeMember>
                </div>
            </div> 

        </div>
    )
})