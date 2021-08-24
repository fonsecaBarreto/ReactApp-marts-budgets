import React, { useState, useEffect } from 'react'
import AppSelector from '../../../../utils/AppInputs/AppSelector'
import { ListBrandsScrew } from '../../../../../services/brand-service'
import AltFormRow from '../../../../utils/AltFormRow'

export default ({ value, inputHandler, label, toSearch }) =>{

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            toSearch()
        }
    }
    return (
        <AltFormRow label={label}>

            <input onKeyDown={handleKeyDown} type="text" value={value} onInput={inputHandler}></input>

        </AltFormRow>
    )
}
