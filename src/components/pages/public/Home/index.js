import React, { useEffect, useRef, useState } from "react"
import './style.css'
import AppSelector from "../../../utils/AppSelector"

import { listCategoriesWithFilterService } from '../../../../services/category-service'

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


    const [category, setCategory ] = useState({
        label: "",
        value: ""
    })

    return (
        <div id="home-page">
            <div ref={inicio} id="home">

                <div className="app-container">
                    <AppSelector 
                        value={category} onInput={setCategory} 
                        loadFunction={listCategoriesWithFilterService} 
                        serializeTo={{label:"name", value: "id"}}
                    ></AppSelector>
                </div>
            </div>
            <div ref={sobre} id="sobre"></div>
            <div ref={contato} id="contato"></div>
        </div>
    )
})