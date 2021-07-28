import React from 'react';
import { PasswordForm, RootForm } from './Forms'
import { withRouter } from 'react-router-dom'

export default withRouter(({ history, state, dialogHandler }) =>{

    const { save } = state

    const submit  = async () => {
        try{
            const result = await save()
            dialogHandler.showSuccess("Novo Cliente Cadastrado com sucesso")
            return history.push(`/admins/marts/${result.id}/update`)
        }catch(errMessage){
            dialogHandler.showFailure(errMessage)
        }
    }

    return (
        <React.Fragment>
            <button onClick={submit}> Cadastrar </button>
            <RootForm {...state} ></RootForm>
            <PasswordForm {...state} ></PasswordForm> 
        </React.Fragment>
    )
})
