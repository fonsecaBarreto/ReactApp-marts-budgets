import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import queryString from 'query-string';

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'
import LoadingComp from '../../../../../utils/LoadingComp';

import RootForm, { FormState } from '../RootForm';
import SecurityForm, { FormState as SecurityFormState } from '../SecurityForm'
import AddressForm, { FormState as AddressFormState } from '../../AddressForm';


import { saveMartService, removeMartService, findMartService, updateAddressService} from '../../../../../../services/mart-service'


export default withRouter(({history}) =>{

    const [ loading, setLoading ] = useState(false)
    const rootState = FormState()
    const securityState = SecurityFormState()
    const addressState = AddressFormState()
    const dialogState = WarningState()

    useEffect(()=>{
        console.log("changed")
        const mart_id = queryString.parse(history.location.search).id
        if(!mart_id) return history.push("/admins/marts")
        load(mart_id)
     
    },[history.location.search])

    const load = async (id) => {
        if(!id) return
        setLoading(true)
        try{
            const result = await findMartService(id)
            if(!result) throw { message: "Não foi possivel encontrar Estabelecimento requerido"}
            rootState.inputs.setData(result)
            if(result.address){
                addressState.inputs.setData(result.address)
            }


        }catch(err){ dialogState.showFailure(err.message,"","", () => history.push("/admins/marts")  ); }
        setLoading(false)
    }

    const update = async () => {
        setLoading(true)
        try{
            const result = await saveMartService(rootState.inputs.data)
            rootState.clearAll()
            rootState.inputs.setData(result)
            dialogState.showSuccess("Informações de stabelecimento atualizadas com sucesso")
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
            dialogState.showSuccess("Endereço Atualizado com sucesso")
        } catch(err) {
            if(err.params) addressState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }

    const remove = () =>{
        console.log("removendo")
    }

    return (
        <div id="admin-mart-update-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
          
            <AdminCommonToolBar>
                <button onClick={update}>  Atualizar </button>
                <button className="warning" onClick={remove}>  Deletar </button>
            </AdminCommonToolBar>

            <RootForm { ...rootState }></RootForm>


            <AdminCommonToolBar>
                <button onClick={updateAddress}> Atualizar Endereço</button>
            </AdminCommonToolBar>

            <AddressForm {...addressState}></AddressForm>
         
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

