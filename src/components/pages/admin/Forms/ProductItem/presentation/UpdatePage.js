import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'
import queryString from 'query-string';

import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'
import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import RootForm, { FormState } from '../RootForm';

import { getFilePath } from '../../../../../../services/utils-service'
import { findItemsService, saveItemsService, removeItemsService } from '../../../../../../services/item-service'


export default withRouter(({history}) =>{

    const [ loading, setLoading ] = useState(false)
    const dialogState = WarningState()
    const rootState = FormState()

    useEffect(()=>{
        let isMounted = true;    
        return () => { isMounted = false }; // cl
    },[])

    useEffect(()=>{
        const product_id = queryString.parse(history.location.search).id
        if(!product_id) return history.push("/admins/products")
        load(product_id)
     
    },[history.location.search])


    const injectData = (data) =>{
        rootState.inputs.setData({ ...data, image: data.image ? getFilePath(data.image) : null})
    }

    const load = async (id) => {
        if(!id) return
        setLoading(true)
        try{
            const result = await findItemsService(id)
            if(!result) throw { message: "Não foi possivel encontrar Item requerido"}
            injectData(result)
        }catch(err){ dialogState.showFailure(err.message,"","", () => history.push("/admins/products")  ); }
        setLoading(false)
    }

    const update = async () => {

        setLoading(true)
        const inputs = { ...rootState.inputs.data }
        try{
            const result = await saveItemsService(inputs)
            rootState.clearAll()
            injectData(result)
            dialogState.showSuccess("Item atualizado com sucesso!")
 
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }

    const remove = async () => {
        setLoading(true)
        try{
            await removeItemsService(rootState.inputs.data.id)
            dialogState.showSuccess("Item Deletado com sucesso.","","", () => history.push("/admins/products")  )
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }


    return (
        <div id="admin-item-update-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
          
            <AdminCommonToolBar>
                <button onClick={update}>  Atualizar </button>
                <button className="warning" onClick={remove}>  Deletar </button>
            </AdminCommonToolBar>

            <RootForm { ...rootState }></RootForm>   

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

