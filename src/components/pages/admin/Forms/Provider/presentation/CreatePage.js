import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'
import { saveProviderService } from '../../../../../../services/provider-service'

import RootForm, { FormState } from '../RootForm';
import AddressForm, { FormState as AddressFormState } from '../../AddressForm';

export default withRouter(({history}) =>{

    const [ loading, setLoading ] = useState(false)
    const dialogState = WarningState()
    const rootState = FormState()
    const addressState = AddressFormState()

    useEffect(()=>{
        let isMounted = true;    
        return () => { isMounted = false }; // cl
    },[])

    const create = async () => {
        setLoading(true)

        const inputs = { ...rootState.inputs.data, address: { ...addressState.inputs.data } }
        
        try{
            const result = await saveProviderService(inputs)
            return dialogState.showSuccess("Novo Fornecedor cadastrado com sucesso","","", () =>{
                history.push(`/admins/providers/update?id=${result.id}`) 
            })
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            if(err.params?.address && typeof err.params?.address === "object" ){
                addressState.errorsState.setErrors(err.params.address)
            }
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }


    return (
        <div id="admin-provider-create-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
          
            <AdminCommonToolBar>
                <button onClick={create}>  Cadastrar </button>
            </AdminCommonToolBar>

            <RootForm { ...rootState }></RootForm>
           
            <AddressForm {...addressState}></AddressForm> 

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

