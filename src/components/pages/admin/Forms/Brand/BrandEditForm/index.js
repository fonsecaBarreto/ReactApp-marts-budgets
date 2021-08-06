import React, { useEffect, useState } from 'react';
import './style.css'
import FormRow from '../../../../../utils/FormRow'
import AdminForm from '../../../../../utils/AdminForm'
import WarningDialog, {WarningState} from '../../../../../utils/WarningDialog';
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar';
import { findBrandsService, removeBrandsService, saveBrandsService } from '../../../../../../services/brand-service'
import LoadingComp from '../../../../../utils/LoadingComp';


const INITIAL_DATA = {
    id: null,
    name: "",
}

export const BardEditFormPage = () =>{

    const dialogState = WarningState()
    const [ loading, setLoading ] = useState(false)
    const [ inputs, setInputs, ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) => setInputs(prev => ({  ...prev,  [key]:value  }))
    const clearInputs = (inputs = {}) =>{ setInputs({ ...INITIAL_DATA, ...inputs }); setErrors({})}
    const clearErrors = () => { setErrors({})}

    return { 
        dialogState,
        loadingState: { loading, setLoading},
        inputsState: { inputs, setInputs, handleInputs, clearInputs },
        errorsState: { errors, setErrors, clearErrors }}
}


export default ( {onCancel, initial_data}) =>{
    const {  dialogState, loadingState, inputsState, errorsState } = BardEditFormPage()
    const { id, name } = inputsState.inputs
    const { errors } = errorsState.errors
    useEffect(()=>{

        inputsState.clearInputs(initial_data ? initial_data : {})
    },[initial_data])

    const removeHandler = async () =>{
        const { setLoading } = loadingState
        const { inputs } = inputsState
        if(!inputs.id) return;
        setLoading(true)
        try{
             await removeBrandsService(inputs.id)
             dialogState.showSuccess("Marca deletada com sucesso!", "", "", () => { onCancel() })
        } 
        catch(err) {  dialogState.showFailure(err.message) } 
        setLoading(false)
    }

    const saveHandler = async () =>{
        const { setLoading } = loadingState
        const { inputs } = inputsState

        setLoading(true)
        try{
            const result = await saveBrandsService(inputs)
            dialogState.showSuccess(inputs.id ? "Marca Atualizada com sucesso." : `Nova Marca cadastrado com sucesso.`,"","",() =>{ 
                onCancel(result)
            })
            
        } catch(err) {
            if(err.params) errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        }
        setLoading(false) 
    }

    return (
        <React.Fragment>


            { loadingState.loading === true ? <LoadingComp></LoadingComp> :

                <div className="brand-modal-form">
               
            
                    <FormRow label="Nome" error={errors?.['name']}>
                        <input value={name} type="text" onInput={e=>inputsState.handleInputs('name',e.target.value)}></input>
                    </FormRow>
                    

                    <AdminCommonToolBar freeze={loadingState.loading}>
                        {id &&  <button className={`warning`}  onClick={removeHandler}>  Deletar </button> }
                        <button  onClick={saveHandler}>  { id ? "Atualizar" : "Cadastrar" }  </button>
                    </AdminCommonToolBar>
                    
                </div>
            }

            <WarningDialog  config={dialogState.dialogconfig} onClose={dialogState.closeDialog} ></WarningDialog>
        </React.Fragment>
    )
}


