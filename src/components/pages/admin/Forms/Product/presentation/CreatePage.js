import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import RootForm, { FormState } from '../RootForm';
import { saveProductservice } from '../../../../../../services/products-service'

export default withRouter(({history}) =>{

    const [ loading, setLoading ] = useState(false)
    const dialogState = WarningState()
    const rootState = FormState()

    useEffect(()=>{
        let isMounted = true;    
        return () => { isMounted = false }; // cl
    },[])

    const create = async () => {
        setLoading(true)

        const inputs = { ...rootState.inputs.data }

        try{
            const result = await saveProductservice(inputs)
            return dialogState.showSuccess("Novo Produto cadastrado com sucesso","","", () =>{
                history.push(`/admins/products/update?id=${result.id}`) 
            })
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }


    return (
        <div id="admin-product-create-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
          
            <AdminCommonToolBar>
                <button onClick={create}>  Cadastrar </button>
            </AdminCommonToolBar>

            <RootForm { ...rootState }></RootForm>   

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

