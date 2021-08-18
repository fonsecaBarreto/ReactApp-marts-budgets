import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import queryString from 'query-string';

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'
import { findProviderService, saveProviderService, removeProviderService, updateProvidersAddress } from '../../../../../../services/provider-service'

import RootForm, { FormState } from '../RootForm';
import AddressForm, { FormState as AddressFormState } from '../../AddressForm';
import TopWrapperGrid from '../../../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'


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
            if(!result) throw { message: "Não foi possivel encontrar cadastro de Fornecedor requerido"}
            rootState.inputs.setData(result)
            if(result.address){
                addressState.inputs.setData(result.address)
            }
        }catch(err){ dialogState.showFailure(err.message,"","", () => history.push("/admins/providers")  ); }
        setLoading(false)
    }

    const remove = async () => {
        setLoading(true)
        try{
            await removeProviderService(rootState.inputs.data.id)
            dialogState.showSuccess("Cadastro de Fornecedor Deletado com sucesso.","","", () => history.push("/admins/providers")  )
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false) 
    }


    const update = async () => {
        setLoading(true)
        try{
            const result = await saveProviderService(rootState.inputs.data)
            const addressResult = await updateProvidersAddress(rootState.inputs.data.id, addressState.inputs.data)
            rootState.clearAll()
            addressState.clearAll()
            rootState.inputs.setData(result)
            addressState.inputs.setData(addressResult) 
            dialogState.showSuccess("Cadastro de Fornecedor atualizado com sucesso.")
        } catch(err) {
            if(err.params) {
                rootState.errorsState.setErrors(err.params)
                addressState.errorsState.setErrors(err.params)
            }
            dialogState.showFailure(err.message)
        } 
        setLoading(false) 
    }

    /* const updateAddress = async () => {
        setLoading(true)
        try{
            const result = await updateProvidersAddress(rootState.inputs.data.id, addressState.inputs.data)
        
            addressState.clearAll()
            addressState.inputs.setData(result) 
            dialogState.showSuccess("Endereço Atualizado com sucesso.")
        } catch(err) {
            if(err.params) addressState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }
 */

    return (
        <div id="admin-provider-update-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
          


            <TopWrapperGrid>

                <AdminCommonToolBar>
                    <button onClick={update}>  Atualizar </button>
                    <button className="warning" onClick={remove}>  Deletar </button>
                </AdminCommonToolBar>

            </TopWrapperGrid>

            <section className="form-flow">
                <RootForm { ...rootState }></RootForm>
                <AddressForm {...addressState}></AddressForm> 
            </section>

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

