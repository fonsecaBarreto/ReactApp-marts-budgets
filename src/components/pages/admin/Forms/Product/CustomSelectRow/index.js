import React, { useState, useEffect } from 'react';
import './style.css'
import AppSelector from '../../../../../utils/AppInputs/AppSelector'
import FormRow from '../../../../../utils/FormRow'

import { CgSelect } from 'react-icons/cg'
import { ListBrandsScrew } from '../../../../../../services/brand-service'
import BrandEditModal from '../../Brand/BrandEditModal'

export const BrandItemView = ({entry}) => {
    const { name } = entry
    return (<span className="screw-item-view">
        <span className="font-bold  ">
            {name}
        </span>
    </span>)
}


export default ({label, error, value , onInput}) =>{

    const [ showModal, setShowModal ] = useState(false)

    return (
        <React.Fragment>

            <FormRow label={label} error={error}>
                <div className="flex-row w100 aln-center ">
                    <button className="custom-selection-button" onClick={()=>setShowModal(true)}> <CgSelect></CgSelect> </button>
                
                    <AppSelector 
                        onLoad={ListBrandsScrew}
                        value={value}
                        component={BrandItemView}
                        onInput={onInput}>
                    </AppSelector>
                </div>
    
            </FormRow>

            <BrandEditModal 
                show={showModal} 
                value={value} //
                onInput={onInput}
                onClose={()=>{ setShowModal(false) }} >     
            </BrandEditModal> 

        </React.Fragment>
    )
}