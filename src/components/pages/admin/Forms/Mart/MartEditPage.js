import React, { useState, useEffect } from 'react';
import { MartState } from './Forms'
import WarningDialog, { WarningState } from '../../../../utils/WarningDialog'
import { withRouter } from 'react-router-dom'
import CreateMart from './Create'
import UpdateMart from './Update'
export default withRouter(({history}) =>{

    const state = MartState()
    const dialogState = WarningState()

    useEffect(() => {
        const pathname = history.location ? history.location.pathname : null;
        if(!pathname) return
        const mart_id = pathname.split('marts/')[1].split('/update')[0]
        if(mart_id && mart_id !== "create") return  state.load(mart_id)
    }, [history.location, history.location.pathname])
  
    const { id } = state.inputs
    return ( 
        <div id="create-mart-page"> 
            <div className="app-container">

              { !id ?
                <React.Fragment>
                    <h1> Create a new Mart </h1>
                    <CreateMart state={state} dialogHandler={dialogState}></CreateMart>
                </React.Fragment>
                :
                <React.Fragment>
                    <h1> Atualizar </h1>
                    <UpdateMart state={state} dialogHandler={dialogState}></UpdateMart>
                </React.Fragment>
            }
            </div>
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})

