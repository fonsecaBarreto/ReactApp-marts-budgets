import React, { useEffect } from 'react';
import './style.css'
import { withRouter } from 'react-router-dom'
import AdminCommonToolBar from '../../../../layouts/Admin/AdminCommonToolBar';
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
import LoadingComp from '../../../../utils/LoadingComp';
import queryString from 'query-string';

import { CategoryState, RootForm, PrimaryUpdateForm } from './Forms'
import TopWrapperGrid from '../../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'
export default withRouter(({history}) =>{

    const state = CategoryState()
    const dialogState = WarningState()

    useEffect(() => {

        const pathname = history.location ? history.location.pathname : null;
        if(!pathname) return

        const action = pathname.split("/categories/")[1]
        const id = queryString.parse(history.location.search).cd
        const category_id = queryString.parse(history.location.search).cs

        if(action === "update" && !id) return history.push("/admins/categories") // not a app interaction
        state.load(action === "update"  ? id : null, category_id)
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
        <div id="create-category-page"  className={`admin-form-page ${loading || freeze? 'freeze' : ''}`}> 

            <TopWrapperGrid>
                <AdminCommonToolBar >
                   {id &&  <button className={`warning `}  onClick={removeHandler}>  Deletar </button> }
                    <button  onClick={()=>{ id ? update() : create() }}>  { id ? "Atualizar" : "Cadastrar" }  </button> 
                </AdminCommonToolBar>
            </TopWrapperGrid>

            <section className="form-flow">
                <RootForm {...state} ></RootForm> 
            </section>
            
           
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})

