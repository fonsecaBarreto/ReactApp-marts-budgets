import React, { useEffect } from 'react';
import './style.css'
import { withRouter } from 'react-router-dom'
import AdminCommonToolBar from '../../../../layouts/Admin/AdminCommonToolBar';
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
import LoadingComp from '../../../../utils/LoadingComp';
import queryString from 'query-string';

import { ProviderState, RootForm } from './Forms'

export default withRouter(({history}) =>{

    const state = ProviderState()
    const dialogState = WarningState()

    useEffect(() => {
        let isMounted = true;    
     
        const pathname = history.location ? history.location.pathname : null;
        if(!pathname) return

        const action = pathname.split("/providers/")[1]
        const provider_id = queryString.parse(history.location.search).pd
        if(action === "update" && ! provider_id) return history.push("/admins/providers")

        state.load( action === "update" ? provider_id : null)
        .catch(errMessage => {
            dialogState.showFailure(errMessage,"","", () =>{ history.push("/admins/providers")});
        })
        return () => { isMounted = false }; // cl
    }, [history.location, history.location.pathname])

    const { save, remove,  inputs, freeze, loading } = state

    const create = async () => {
        try{
            const result = await save()
            dialogState.showSuccess("Novo Fornecedor cadastrado com sucesso.")
            return history.push(`/admins/providers/update?pd=${result.id}`)
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }

    const update  = async () => {
        try{
            await save(inputs)
            dialogState.showSuccess("Fornecedor Atualizado!")
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }

    const removeHandler  = async () => {
        try{
            await remove(inputs.id) 
            return dialogState.showSuccess("Fornecedor deletado com sucesso!", "", "", () =>{
                return history.push("/admins/providers") 
            })
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }
  
    const { id } = state.inputs

    return ( 
        <div id="create-provider-page"> 
       
            { loading  ? <LoadingComp></LoadingComp> :
                <div className="app-container">
                    
                    <RootForm {...state} ></RootForm>

                    <AdminCommonToolBar freeze={freeze}>
                        {id &&  <button className={` warning ${freeze ? 'freeze' : ''}`}  onClick={removeHandler}>  Deletar </button> }
                        <button className={`${freeze ? 'freeze' : ''}`} onClick={()=>{ id ? update() : create() }}>  { id ? "Atualizar" : "Cadastrar" }  </button>
                    </AdminCommonToolBar>
                     
                </div>
            }
           
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})

