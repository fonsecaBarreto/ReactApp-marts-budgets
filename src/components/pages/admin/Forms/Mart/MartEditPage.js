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
        const mart_id = queryString.parse(history.location.search).md
        if(action === "update" && !mart_id) return history.push("/admins/marts") // not a app interaction

        state.load(action === "update"  ? mart_id : null)
        .catch((errMessage) =>{ 
            dialogState.showFailure(errMessage,"","", () => history.push("/admins/marts")  );
        })

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
            
                <div className="app-container">
                    <React.Fragment>

                        <AdminCommonToolBar freeze={freeze} className="desktop-only">
                            {id &&  <button className={`warning ${freeze ? 'freeze' : ''}`}  onClick={removeHandler}>  Deletar </button> }
                            <button className={`${freeze ? 'freeze' : ''}`} onClick={()=>{ id ? update() : create() }}>  { id ? "Atualizar" : "Cadastrar" }  </button>
                        </AdminCommonToolBar>
                        
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

                        <AdminCommonToolBar freeze={freeze} className="mobile-only">
                            {id &&  <button className={`warning ${freeze ? 'freeze' : ''}`}  onClick={removeHandler}>  Deletar </button> }
                            <button className={`${freeze ? 'freeze' : ''}`} onClick={()=>{ id ? update() : create() }}>  { id ? "Atualizar" : "Cadastrar" }  </button>
                        </AdminCommonToolBar>

                    </React.Fragment>
                </div>
        }
           
        
        <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})

