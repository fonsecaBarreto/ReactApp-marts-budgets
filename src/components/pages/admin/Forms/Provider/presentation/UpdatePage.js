import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import queryString from 'query-string';

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'
import { findProviderService, saveProviderService, removeProviderService } from '../../../../../../services/provider-service'
import { updateAddressService } from '../../../../../../services/mart-service'

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

    useEffect(()=>{
        const provider_id = queryString.parse(history.location.search).id
        if(!provider_id) return history.push("/admins/providers")
        load(provider_id)
     
    },[history.location.search])

    const load = async (id) => {
        if(!id) return
        setLoading(true)
        try{
            const result = await findProviderService(id)
            if(!result) throw { message: "Não foi possivel encontrar Fornecedor requerido"}
            rootState.inputs.setData(result)
            if(result.address){
                addressState.inputs.setData(result.address)
            }
        }catch(err){ dialogState.showFailure(err.message,"","", () => history.push("/admins/providers")  ); }
        setLoading(false)
    }


    const update = async () => {
        setLoading(true)
        try{
            const result = await saveProviderService(rootState.inputs.data)
            rootState.clearAll()
            rootState.inputs.setData(result)
            dialogState.showSuccess("Informações de Fornecedor atualizadas com sucesso.")
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false) 
    }

    const remove = async () => {
       setLoading(true)
        try{
            await removeProviderService(rootState.inputs.data.id)
            dialogState.showSuccess("Fornecedor Deletado com sucesso.","","", () => history.push("/admins/providers")  )
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false) 
    }

    const updateAddress = async () => {
        setLoading(true)
        try{
            const result = await updateAddressService(addressState.inputs.data)
        
            addressState.clearAll()
            addressState.inputs.setData(result) 
            dialogState.showSuccess("Endereço Atualizado com sucesso.")
        } catch(err) {
            if(err.params) addressState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }



    return (
        <div id="admin-provider-update-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
          
   
            <AdminCommonToolBar>
                 <button onClick={updateAddress}> Atualizar Endereço</button>
                <button onClick={update}>  Atualizar </button>
                <button className="warning" onClick={remove}>  Deletar </button>
            </AdminCommonToolBar>

            <RootForm { ...rootState }></RootForm>
           
            <AddressForm {...addressState}></AddressForm> 

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

