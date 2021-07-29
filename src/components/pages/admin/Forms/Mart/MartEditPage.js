import React, { useEffect } from 'react';
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
        const mart_id = pathname.split('marts/')[1].split('/update')[0]
        if(mart_id && mart_id !== "create") return  state.load(mart_id)
    }, [history.location, history.location.pathname])

    const { save, inputs, freeze, loading } = state

    const create = async () => {
        try{
            const result = await save()
            dialogState.showSuccess("Novo Cliente Cadastrado com sucesso")
            return history.push(`/admins/marts/${result.id}/update`)
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }

    const update  = async () => {
        try{
            const result = await save(inputs)
            dialogState.showSuccess("Cliente Atualizado!")
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }
  
    const { id } = state.inputs
    return ( 
        <div id="create-mart-page"> 
       
            {loading  ? <LoadingComp></LoadingComp> :
            


            <React.Fragment>
                <AdminCommonToolBar>
                    <button className={`${freeze ? 'freeze' : ''}`}
                        onClick={()=>{
                        id ? update() : create()
                    }}>  { id ? "Atualizar" : "Cadastrar" } </button> 
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

