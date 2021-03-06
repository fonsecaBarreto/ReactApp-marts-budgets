import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'

import RootForm, { FormState } from '../RootForm';
import SecurityForm, { FormState as SecurityFormState } from '../SecurityForm'
import AddressForm, { FormState as AddressFormState } from '../../AddressForm';
import TopWrapperGrid from '../../../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'

import { saveMartService } from '../../../../../../services/mart-service'

export default withRouter(({history}) =>{

    const [ loading, setLoading ] = useState(false)

    const rootState = FormState()
    const securityState = SecurityFormState()
    const addressState = AddressFormState()
    const dialogState = WarningState()

    const inputs = { ...rootState.inputs.data, ...securityState.inputs.data, address: { ...addressState.inputs.data } }

    const create = async () => {
        setLoading(true)
        try{
            const result = await saveMartService(inputs)
            return dialogState.showSuccess("Novo estabelecimento cadastrado com sucesso","","", () =>{
                history.push(`/admins/marts/update?id=${result.id}`) 
            })
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            if(err.params) securityState.errorsState.setErrors(err.params)
            if(err.params?.address && typeof err.params?.address === "object" ){
                addressState.errorsState.setErrors(err.params.address)
            }
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }

    useEffect(()=>{
        let isMounted = true;    
     
        return () => { isMounted = false }; // cl
    },[])

    return (
        <div id="admin-mart-create-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>


            <TopWrapperGrid>
                <AdminCommonToolBar>
                    <button onClick={create}>  Cadastrar </button>
                </AdminCommonToolBar> 
            </TopWrapperGrid>

            <section className="form-flow">
                <RootForm { ...rootState }></RootForm>
                <SecurityForm { ...securityState }></SecurityForm>
                <AddressForm {...addressState}></AddressForm>
            </section>

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

