import React, { useState, useEffect } from 'react'
import AppSelector from '../../../../utils/AppInputs/AppSelector'
import { ListBrandsScrew } from '../../../../../services/brand-service'
import AltFormRow from '../../../../utils/AltFormRow'
export default ({ value, inputHandler, toSearch, disabled }) =>{

    const [ wasCalledOnce, setWasCalledOnce ]= useState(false)
/* 
    useEffect(()=>{ 
        if(wasCalledOnce === false) return setWasCalledOnce(true);
        toSearch()
    },[value])  */

    return (
        <AltFormRow label=" Selecione uma Marca">
            <AppSelector 
                disabled={disabled}
                onLoad={ListBrandsScrew}
                value={value}
                component={( ({entry}) => (entry.name))}
                onInput={result =>{
                    if(!result) return inputHandler('brands',[{label: "", value: ""}])
                    inputHandler('brands', [{ label: result.name, value: result.id }])
                }}>
            </AppSelector>
        </AltFormRow>
    )
}
