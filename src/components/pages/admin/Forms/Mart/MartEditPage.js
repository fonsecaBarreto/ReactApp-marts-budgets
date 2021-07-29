import React, { useEffect } from 'react';
import queryString from 'query-string';
import './style.css'
import { MartState } from './Forms'
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
import { withRouter } from 'react-router-dom'
import LoadingComp from '../../../../utils/LoadingComp';

import AdminCommonToolBar from '../../../../layouts/Admin/AdminCommonToolBar';
import { PasswordForm, RootForm } from './Forms'


export default withRouter(({history}) =>{

    const state = MartState()
    const dialogState = WarningState()

    useEffect(() => {
     
        const pathname = history.location ? history.location.pathname : null;
        if(!pathname) return

        const action = pathname.split("/marts/")[1]
        switch (action) {
        
            case "update": 
                const mart_id = queryString.parse(history.location.search).md
                if(mart_id) return state.load(mart_id).catch((errMessage) =>{ 
                    dialogState.showFailure(errMessage,"","", () =>{
                        history.push("/admins/marts")
                    });
                })
                history.push("/admin")
            ;break;

            default: 
                state.load(null)    
            ; break;
        }

    }, [history.location, history.location.pathname])

    const { save, remove,  inputs, freeze, loading } = state

    const create = async () => {
        try{
            const result = await save()
            dialogState.showSuccess("Novo estabelecimento cadastrado com sucesso")
            return history.push(`/admins/marts/update?md=${result.id}`)
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }

    const update  = async () => {
        try{
            await save(inputs)
            dialogState.showSuccess("Estabelecimento Atualizado!")
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }

    const removeHandler  = async () => {
        try{
            await remove(inputs.id) 
            dialogState.showSuccess("Estabelecimento Deletado com sucesso!", "", "", () =>{
                history.push("/admins/marts")
            })
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }
  
    const { id } = state.inputs
    return ( 
        <div id="create-mart-page"> 
       
            {loading  ? <LoadingComp></LoadingComp> :
            
            <React.Fragment>
                <AdminCommonToolBar freeze={freeze}>
                    {id &&  <button className="warning"  onClick={removeHandler}>  Deletar </button> }
                    <button className={`${freeze ? 'freeze' : ''}`} onClick={()=>{ id ? update() : create() }}>  { id ? "Atualizar" : "Cadastrar" }  </button>
                  
                </AdminCommonToolBar>

        
                <div className="app-container">
                    { !id ?
                        <React.Fragment>
                            <RootForm {...state} ></RootForm>
                            <PasswordForm {...state} ></PasswordForm> 
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <RootForm {...state} ></RootForm>
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        }
           
        
        <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})

