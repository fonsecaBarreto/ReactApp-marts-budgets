import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import './style.css'

import queryString from 'query-string';

import WarningDialog, { WarningState } from '../../../../../utils/WarningDialog'
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar'

import RootForm, { FormState } from '../RootForm';
import SecurityForm, { FormState as SecurityFormState } from '../SecurityForm'
import AddressForm, { FormState as AddressFormState } from '../../AddressForm';


import { saveMartService, removeMartService, findMartService, updateAddressService} from '../../../../../../services/mart-service'
import { getFilePath } from '../../../../../../services/utils-service'

import { AiOutlinePaperClip } from 'react-icons/ai'

import TopWrapperGrid from '../../../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'


export default withRouter(({history}) =>{

    const [ annexes, setAnexess ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const rootState = FormState()
    const securityState = SecurityFormState()
    const addressState = AddressFormState()
    const dialogState = WarningState()


    useEffect(()=>{
        let isMounted = true;    
        return () => { isMounted = false }; // cl
    },[])
    
    useEffect(()=>{
        const mart_id = queryString.parse(history.location.search).id
        if(!mart_id) return history.push("/admins/marts")
        load(mart_id)
     
    },[history.location.search])

    const load = async (id) => {
        if(!id) return
        setLoading(true)
        try{
            const result = await findMartService(id)
            if(!result) throw { message: "Não foi possivel encontrar cadastro de Estabelecimento requerido"}
            rootState.inputs.setData(result)
            if(result.address){
                addressState.inputs.setData(result.address)
            }
            if(result.annexes){
                setAnexess(result.annexes)
            }


        }catch(err){ dialogState.showFailure(err.message,"","", () => history.push("/admins/marts")  ); }
        setLoading(false)
    }

    const remove = async () => {
        setLoading(true)
        try{
            await removeMartService(rootState.inputs.data.id)
            rootState.clearAll()
            dialogState.showSuccess("Cadastro de Estabelecimento deletado com sucesso.","","", () => history.push("/admins/marts")  )
        } catch(err) {
            if(err.params) rootState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }

    const update = async () => {
        setLoading(true)
        try{
            const result = await saveMartService(rootState.inputs.data)
            const addressResult = await updateAddressService(addressState.inputs.data)
            rootState.clearAll()
            addressState.clearAll()
            addressState.inputs.setData(addressResult) 
            rootState.inputs.setData(result)
            dialogState.showSuccess("Cadastro de Estabelecimento atualizado com sucesso.")
        } catch(err) {
            if(err.params) {
                rootState.errorsState.setErrors(err.params)
                addressState.errorsState.setErrors(err.params)
            } 
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }


  /*   const updateAddress = async () => {
        setLoading(true)
        try{
            const result = await updateAddressService(addressState.inputs.data)
        
            addressState.clearAll()
            addressState.inputs.setData(result) 
            dialogState.showSuccess("Endereço Atualizado com sucesso.")
        } catch(err) {
            if(err.params) addressState.errorsState.setErrors(err.params)
            dialogState.showFailure(err.message)
        } 
        setLoading(false)
    }
 */

    return (
        <div id="admin-mart-update-page" className={`admin-form-page ${loading? 'freeze' : ''}`}>
          

          <TopWrapperGrid>
            <AdminCommonToolBar>
                <button onClick={update}>  Atualizar </button>
                <button className="warning" onClick={remove}>  Deletar </button>
            </AdminCommonToolBar>
        </TopWrapperGrid>

            <section className="form-flow">

                <RootForm { ...rootState }> </RootForm>
                <AddressForm {...addressState}></AddressForm>

                { annexes?.length > 0 && 
                    <div className="app-container">
                        <h4 style={{textAlign:"left", margin: "4px"}}> Anexos:</h4>
                        {annexes.map((a,i) =>{
                            return (
                                <a href={getFilePath(a.name)} key={i} target='_blank' className="mart-annex-item">
                                    <span className={'font-bold '}>  <AiOutlinePaperClip></AiOutlinePaperClip> 
                                        {a.name} 
                                    </span> 
                                </a>
                            )
                        })}
                    </div> 
                }
         
            </section>
            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        
        </div>
    )
})

