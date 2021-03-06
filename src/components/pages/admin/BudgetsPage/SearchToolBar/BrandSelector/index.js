import React, { useState, useEffect } from 'react'
import './style.css'
import AppSelector from '../../../../../utils/AppInputs/AppSelector'
import { ListBrandsScrew } from '../../../../../../services/brand-service'

export default ({ queriesState, toSearch }) =>{

    const [ wasCalledOnce, setWasCalledOnce ]= useState(false)
    const { queries, setBrands } = queriesState

    useEffect(()=>{ 
        if(wasCalledOnce === false){ 
            return setWasCalledOnce(true)
        }
        toSearch()
    },[queries.brands])

    return (

        <div className="akustb-brand-selector akustb-wrapper">   
            <label> Selecione uma Marca </label>
                <AppSelector 
                    onLoad={ListBrandsScrew}
                    value={queries.brands[0]}
                    component={( ({entry}) => (entry.name))}
                    onInput={result =>{
                        if(!result) return setBrands([{label: "", value: ""}])
                        setBrands([{ label: result.name, value: result.id }])
                    }}>
                </AppSelector>
         
        </div>
    )
}
