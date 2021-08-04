import React, { useEffect, useState } from 'react'
import './style.css'
import { withRouter } from 'react-router-dom'
import WarningDialog, { WarningState } from '../../utils/WarningDialog'
import FormRow from '../../utils/FormRow'
import Logo from '../../../assets/logo2.svg'
import { changePassword } from '../../../services/mart-login-service'
import { setLoading } from '../../../store/reducers/global/actions'
import { useDispatch } from 'react-redux'
const INITIAL_DATA = {
    name: "",
    token: "",
    password: "",
    passwordConfirmation: "",
}

const State = () =>{

    const [ inputs, setInputs ] = useState(INITIAL_DATA)
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) =>{ 
        setInputs(prev => ({  ...prev,  [key]:value  }))
    }

    const clearInputs = () => {
        return setInputs({ ...INITIAL_DATA })
    }

    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs }
}


export default withRouter(({history}) =>{
    const dispatch = useDispatch()
    const warningState = WarningState()
    const { inputs, setInputs, handleInputs, errors, setErrors, clearInputs } = State()

    useEffect(()=>{
        if(!history.location.search) return
        const queries = history.location.search.split("?v=")[1].split('&n=')
        const token = queries[0]
        const name = queries[1]
        setInputs({ ...inputs, token, name})
    },[history, history.location])


    const submit = async (e) => {
        e.preventDefault()
        dispatch(setLoading(true))

        try {
            await changePassword(inputs)
            setErrors({})

            warningState.showSuccess("Senha Alterada com sucesso", null, "Sucesso!", () =>{
                history.push("/login")
                //DEve voltar para o login
            })
        } catch(err){
            if(err.params) setErrors(err.params)
            warningState.showFailure(err.message)
        }

        dispatch(setLoading(false))
    }

    const { password, passwordConfirmation, name, token } = inputs
    return ( <div id="change-passowrd-page">


        <img src={Logo} className="change-password-logo" ></img> 
        <form className="change-passowrd-form">


            <h2 className="change-password-title"> Insira sua noma senha </h2>
            <span> Bem vindo de volta, 
                <span className="font-bold"> { name.replace(/%20/g, " ")} </span>
                </span>
            <FormRow label="Senha" error={errors?.['password']}>
                <input autoFocus value={password} type="password" onInput={e=>handleInputs('password',e.target.value)}></input>
            </FormRow>

            <FormRow label="Confirme a senha" error={errors?.['passwordConfirmation']}>
                <input value={passwordConfirmation} type="password" onInput={e=>handleInputs('passwordConfirmation',e.target.value)}></input>
            </FormRow>

            <button onClick={submit} className={`change-password-button `} > 
                Enviar
            </button>

        </form>

        <WarningDialog config={warningState.dialogconfig} onClose={warningState.closeDialog}></WarningDialog>

    </div>)
})