import React, { useState } from "react"
import './style.css'
import DefaultStateAdapter from "../utils/DefaultStateAdapter"
import LoginFormRow from '../NewLoginFormRow'
import LoginFormGrid from '../FormGrid'
/* import { signInService, forgotPasswordService} from '../../../../../services/mart-login-service' */
/* import { setMart } from '../../../../../store/reducers/global/actions' */


import { FaRegUserCircle } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'

const INITIAL_SIGNIN_DATA = {
    credentials: "",
    password: "",
}

export const SignInFormState = () =>{
    return DefaultStateAdapter(INITIAL_SIGNIN_DATA)
}

export default ({ state }) =>{

 
    const {  inputsState, errorsState, loadingState, clearAll } =state
    const { data, handleInputs } = inputsState
    const { errors, setErrors } = errorsState
    const { credentials, password} = data


    return(

        <LoginFormGrid columns={[6,6]}>

            <LoginFormRow label="E-mail, Telefone ou CNPJ/CPF" error={errors?.['credentials']}>
                <div className="login-input-wrapper">
                    <FaRegUserCircle className="liw-icon"></FaRegUserCircle>
                    <input autoFocus value={credentials} type="text" onInput={e=>handleInputs('credentials',e.target.value)}></input>
                </div>
            </LoginFormRow>

            <LoginFormRow label="Senha de Acesso" error={errors?.['password']} >
                <div className="login-input-wrapper">
                    <RiLockPasswordLine className="liw-icon"></RiLockPasswordLine>
                    <input value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
                </div>
            </LoginFormRow>

        </LoginFormGrid>
    )
}