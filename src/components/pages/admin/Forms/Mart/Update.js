import React from 'react';
import { RootForm } from './Forms'


export default ({state, dialogHandler}) =>{

    const { inputs, save } = state
    const submit  = async () => {
        try{
            const result = await save(inputs)
            dialogHandler.showSuccess("Cliente Atualizado!")
        }catch(errMessage){
            dialogHandler.showFailure(errMessage)
        }
    }

    return (
        <React.Fragment>
            <button onClick={submit}> Atualizar </button>
            <RootForm {...state} ></RootForm>
        </React.Fragment>
    )
} 