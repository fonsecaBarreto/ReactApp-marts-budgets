import React, { useState } from 'react'
import './style.css'
import { useHistory } from 'react-router'
import AddressForm, { AddressFormState } from '../../../../../Login/AddressForm'
import SignUpForm, {SignUpFormState} from '../../../../../Login/SignUpForm'
import AnnexsForm, { AnnexState} from '../../../../../Login/AnnexsForm'
import CarouselFrame from './CarouselFrame'
import { signUpService } from '../../../../../../services/mart-login-service'

import {  useDispatch } from 'react-redux'
import { showFailure, showSuccess } from '../../../../../../store/reducers/dialog/actions'
import HandShakeImage from '../../../../../../assets/handshake.jpg'
export default () =>{
    const dispatch  = useDispatch()
    const history = useHistory()
    const addressFormState = AddressFormState()
    const signUpFormState = SignUpFormState()
    const annexState = AnnexState()
    const [ loading, setLoading ] = useState(false)
    const [ forceIndex, setForceIndex ] = useState(null)

    const afterInfo = () =>{
        return true
    }

    const submit = async () =>{
        setLoading(true)
        signUpFormState.errorsState.setErrors({})
        addressFormState.errorsState.setErrors({})
        annexState.errorsState.setErrors({})
        try{
            const data = { 
                ...signUpFormState.inputsState.data, 
                address: {...addressFormState.inputsState.data}, 
                annexeses: annexState.files
            }

            await signUpService(data)
            dispatch(showSuccess(
                "Cadastrado com successo!", 
                "Obrigado pela confiança, entraremos em contato em breve!",
                "Sucesso!"))
            return true

        }catch(err){
            var whereIsTheError = 0
            if(err.params) {
                signUpFormState.errorsState.setErrors(err.params)
                if(err.params.address){
                    whereIsTheError=1
                    addressFormState.errorsState.setErrors(err.params.address) 
                }
                if(err.params.annexs){
                    whereIsTheError=2
                    annexState.errorsState.setErrors([err.params.annexs]) 
                }
            }
            setForceIndex(whereIsTheError)
            dispatch(showFailure(err.message))

            return false
        }finally {
            setLoading(false)
        }
    } 

    const pageStruct = [
        { title: "Informações", beforeNext: afterInfo},
        { title: "Endereço"},
        { title: "Anexos",  beforeNext: submit,  nextLabel:"Finalizar"},
        { title: "Fim", hideButtons: true}, 
    ]

    return (
        <div className="main-content-left-side">
        
            <CarouselFrame pageStruct={pageStruct} forceIndex={forceIndex} setForceIndex={setForceIndex} loading={loading}>
    
                <SignUpForm state={signUpFormState}></SignUpForm>
            
                <AddressForm state={addressFormState}></AddressForm>

                <AnnexsForm state={annexState}></AnnexsForm> 

                <span className="congratspanel">
                    <img src={HandShakeImage}></img>
                    <h2> Obrigado!</h2> 
                    <h3> Suas informações passarão por um processo de validação </h3>
                    <span>Receberá em breve um E-mail de confirmação</span>


                </span>
            </CarouselFrame>
                
        </div>
    )
}