
import React, { useEffect, useState } from 'react'
import './style.css'

export default ({ queriesState, toSearch }) =>{

    const [ wasCalledOnce, setWasCalledOnce]= useState(false)
    const { queries, setForecast } = queriesState

    const handleChange = (e) =>{
        setForecast(e.target.value)
    }
    useEffect(()=>{ 
        if(wasCalledOnce === false){ 
            return setWasCalledOnce(true)
        }
        toSearch()

    },[queries.forecast])
    return (

        <div className="akustb-forecast-selector akustb-wrapper">   

            <label> Previsão de compra </label>
            <select  value={queries.forecast} onChange={handleChange}>
                <option value=""> Todos </option>
                <option value={15}> em 15 dias </option>
                <option value={30}> em 1 mes</option>
                <option value={60}> em 2 meses</option>
                <option value={90}> em 3 meses</option>
            </select>
         
        </div>
    )
}

