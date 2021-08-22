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
export default () =>{
    const dispatch  = useDispatch()
    const history = useHistory()
    const addressFormState = AddressFormState()
    const signUpFormState = SignUpFormState()
    const annexState = AnnexState()
    const [ loading, setLoading ] = useState(false)
    const [ forceIndex, setForceIndex ] = useState(null)
   /*  const [ loading, setLoading ] = useState(false)
    const signupState = SignUpState()

    const handleErrors = (err) =>{
        switch(err.name){
            case "InvalidFileBufferError": {
                dialogState.showFailure("Atenção!",err.message)
            };break;
            default: dialogState.showFailure(err.message)
        }
    }

    const handleSuccess = (data) => {
        dialogState.showSuccess( 
            "Cadastrado com successo!", 
            "Obrigado pela confiança, entraremos em contato em breve!",
            "Sucesso!",
            async () => {  history.push("/login") })
    }
 */
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
            console.log("deu ruim")
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
            //handle ERor qui
        }
        setLoading(false)
    } 

    const pageStruct = [
        { title: "Informações", beforeNext: afterInfo},
        { title: "Endereço"},
        { title: "Anexos", beforeNext: submit, nextLabel:"Finalizar"},
        { title: ""}, 
    ]

    return (
        <div className="main-content-left-side">
            {forceIndex}
            <CarouselFrame pageStruct={pageStruct} forceIndex={forceIndex} setForceIndex={setForceIndex}>
    
                <SignUpForm state={signUpFormState}></SignUpForm>
            
                <AddressForm state={addressFormState}></AddressForm>

                <AnnexsForm state={annexState}></AnnexsForm> 

                <span> Obrigado</span>
            </CarouselFrame>
                
        </div>
    )
}