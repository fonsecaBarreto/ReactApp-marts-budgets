import React, { useEffect, useState } from 'react'
import './style.css'
import { withRouter } from 'react-router-dom'
import WarningDialog, { WarningState } from '../../../utils/WarningDialog'
import FormRow from '../../../utils/FormRow'
import { FaUserShield } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../../store/reducers/global/actions'
import { signInService } from '../../../../services/admin-login-service'
import { setAdmin } from '../../../../store/reducers/global/actions'

const INITIAL_SIGNIN_DATA = {
    username: "",
    password: "",
}

export const LoginState = () =>{

    const [ loading, setLoading ] = useState(false)
    const [ inputs, setInputs ] = useState(INITIAL_SIGNIN_DATA)
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) =>{ 
        setInputs(prev => ({  ...prev,  [key]:value  }))
    }

    const clearInputs = () => {
        return setInputs({ ...INITIAL_SIGNIN_DATA })
    }

    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs, loading, setLoading }
}

export default withRouter(({ history }) =>{
    const dispatch = useDispatch()
    const dialogState = WarningState()
    const { inputs, errors, handleInputs } = LoginState()
    
    useEffect(()=>{
        const err = history.location.search.split("?e=")[1]
        if(err) return dialogState.showFailure( err.replace(/%20/g, " "))
    },[history, history.location])

    const handleErrors = (err) => { dialogState.showFailure(err.message) }
    const handleSuccess = () => { 
        dispatch(setAdmin(null))
        history.push("/admins/dashboard")  
        
    }

    const submit = async(e) =>{
        e.preventDefault()
        dispatch(setLoading(true))
        try{
            await signInService(inputs)
            handleSuccess()
        } catch(err) {
            handleErrors(err)
        }
        dispatch(setLoading(false))
    }

    const { username, password } = inputs

    return (
        <div id="admin-login-screen"> 

            <div className={`admin-login-box`}>

                <div className="admin-login-header">

                    <FaUserShield></FaUserShield>
                    <span> Administrador </span>
                </div>

                <form  className="admin-login-form">
            
                    <FormRow label="Nome de usuario" error={errors?.['username']}>
                        <input autoFocus value={username} type="text" onInput={e=>handleInputs('username',e.target.value)}></input>
                    </FormRow>

                    <FormRow label="Senha de acesso" error={errors?.['password']}>
                        <input value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
                    </FormRow>

                    <button onClick={submit} className={`admin-login-form-button `} > 
                        entrar
                    </button>

                </form>
            </div>

            <WarningDialog config={dialogState.dialogconfig} onClose={dialogState.closeDialog}></WarningDialog>
        </div>
    )
})  