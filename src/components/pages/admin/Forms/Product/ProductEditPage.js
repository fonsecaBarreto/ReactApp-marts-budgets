import React, { useEffect } from 'react';
import './style.css'
import { withRouter } from 'react-router-dom'
import AdminCommonToolBar from '../../../../layouts/Admin/AdminCommonToolBar';
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
import LoadingComp from '../../../../utils/LoadingComp';
import queryString from 'query-string';
import { RiSave3Fill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import { ProductState, RootForm } from './Forms'

export default withRouter(({history}) =>{

    const state = ProductState()
    const dialogState = WarningState()

    useEffect(() => {

        const pathname = history.location ? history.location.pathname : null;
        if(!pathname) return

        const action = pathname.split("/products/")[1]
        const product_id = queryString.parse(history.location.search).id
        if(action === "update" && ! product_id) return history.push("/admins/products")

        state.load( action === "update" ? product_id : null)
        .catch(errMessage => {
            dialogState.showFailure(errMessage,"","", () =>{ history.push("/admins/products")});
        })
        
    }, [history.location, history.location.pathname])

    const { save, remove,  inputs, freeze, loading } = state

    const create = async () => {
        try{
            const result = await save()
            dialogState.showSuccess("Novo produto cadastrado com sucesso.")
            return history.push(`/admins/products/update?id=${result.id}`)
        }catch(errMessage){  dialogState.showFailure(errMessage) }
    }

    const update  = async () => {
        try{ await save(inputs);dialogState.showSuccess("Produto Atualizado!")
        }catch(errMessage){  dialogState.showFailure(errMessage) }
    }

    const removeHandler  = async () => {
        try{
            await remove(inputs.id) 
            dialogState.showSuccess("Produto deletado com sucesso!", "", "", () =>{
                history.push("/admins/products")
            })
        }catch(errMessage){  dialogState.showFailure(errMessage) }
    }
  
    const { id } = state.inputs

    return ( 
        <div id="create-product-page"> 
       
            { loading  ? <LoadingComp></LoadingComp> :
                <div className="app-container">



                    <AdminCommonToolBar className="desktop-only">
                        {id &&  <button className={` warning ${freeze ? 'freeze' : ''}`}  onClick={removeHandler}> 
                        <FaTrashAlt></FaTrashAlt> Deletar </button> }
                        <button className={`${freeze ? 'freeze' : ''}`} onClick={()=>{ id ? update() : create() }}> 
                        <RiSave3Fill></RiSave3Fill> { id ? "Atualizar" : "Cadastrar" }  </button>
                    </AdminCommonToolBar>
                    
                    <RootForm {...state} > </RootForm>

                    <AdminCommonToolBar className="mobile-only">
                        {id &&  <button className={` warning ${freeze ? 'freeze' : ''}`}  onClick={removeHandler}> 
                        <FaTrashAlt></FaTrashAlt> Deletar </button> }
                        <button className={`${freeze ? 'freeze' : ''}`} onClick={()=>{ id ? update() : create() }}> 
                        <RiSave3Fill></RiSave3Fill> { id ? "Atualizar" : "Cadastrar" }  </button>
                    </AdminCommonToolBar>

                   
                 
                </div>
            }
           
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})

const TollBar = () =>{
    
}