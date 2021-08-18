import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import queryString from 'query-string';

import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import RootForm, { FormState } from '../RootForm';
import { findProductService, saveProductservice, removeProductService } from '../../../../../../services/products-service'
import { getFilePath } from '../../../../../../services/utils-service'

import TopWrapperGrid from '../../../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'

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
            const result = await findProductService(id)
            if(!result) throw { message: "Não foi possivel encontrar Produto requerido"}
            injectData(result)
        }catch(err){ dialogState.showFailure(err.message,"","", () => history.push("/admins/products")  ); }
        setLoading(false)
    }

    const update = async () => {

        setLoading(true)
        const inputs = { ...rootState.inputs.data }
        try{
            const result = await saveProductservice(inputs)
            rootState.clearAll()
            injectData(result)
            dialogState.showSuccess("Produto atualizado com sucesso!")
 
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }

    const remove = async () => {
        setLoading(true)
        try{
            await removeProductService(rootState.inputs.data.id)
            dialogState.showSuccess("Produto Deletado com sucesso.","","", () => history.push("/admins/products")  )
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }


    return (
        <div id="admin-product-update-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
            
            <TopWrapperGrid>

                <AdminCommonToolBar>
                    <button onClick={update}>  Atualizar </button>
                    <button className="warning" onClick={remove}>  Deletar </button>
                </AdminCommonToolBar>
            </TopWrapperGrid>

            <section className="form-flow">


                <RootForm { ...rootState }></RootForm>   
            </section>

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

