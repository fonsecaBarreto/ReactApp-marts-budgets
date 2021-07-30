import React, { useEffect } from 'react';
import './style.css'
import { withRouter } from 'react-router-dom'
import AdminCommonToolBar from '../../../../layouts/Admin/AdminCommonToolBar';
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
import LoadingComp from '../../../../utils/LoadingComp';
import queryString from 'query-string';

import { CategoryState, RootForm, PrimaryUpdateForm } from './Forms'

export default withRouter(({history}) =>{

    const state = CategoryState()
    const dialogState = WarningState()

    useEffect(() => {

        const pathname = history.location ? history.location.pathname : null;
        if(!pathname) return

        const action = pathname.split("/categories/")[1]
        const category_id = queryString.parse(history.location.search).cd
        if(action === "update" && !category_id) return history.push("/admins/categories") // not a app interaction

        state.load(action === "update"  ? category_id : null)
        .catch((errMessage) =>{ 
            dialogState.showFailure(errMessage,"","", () => history.push("/admins/categories")  );
        })

    }, [history.location, history.location.pathname])

    const { save, remove,  inputs, freeze, loading } = state

    const create = async () => {
        try{
            const result = await save()
            dialogState.showSuccess("Nova Categoria cadastrado com sucesso.")
            return history.push(`/admins/categories/update?cd=${result.id}`)
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }

    const update  = async () => {
        try{
            await save(inputs)
            dialogState.showSuccess("Categoria Atualizada!")
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }

    const removeHandler  = async () => {
        try{
            await remove(inputs.id) 
            dialogState.showSuccess("Categoria deletada com sucesso!", "", "", () =>{
                history.push("/admins/categories")
            })
        }catch(errMessage){
            dialogState.showFailure(errMessage)
        }
    }
  
    const { id, category_id } = state.inputs

    return ( 
        <div id="create-category-page"> 
       
            { loading  ===true ? <LoadingComp></LoadingComp> :
            
                <div className="app-container">
                
                    <AdminCommonToolBar freeze={freeze}>
                        {id &&  <button className={`warning ${freeze ? 'freeze' : ''}`}  onClick={removeHandler}>  Deletar </button> }
                        <button className={`${freeze ? 'freeze' : ''}`} onClick={()=>{ id ? update() : create() }}>  { id ? "Atualizar" : "Cadastrar" }  </button>
                    </AdminCommonToolBar>

                    {
                        (id && !category_id) ?
                        <PrimaryUpdateForm {...state} ></PrimaryUpdateForm>
                        :
                        <RootForm {...state} ></RootForm>
                    }

                </div>
            }
           
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})

