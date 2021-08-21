import AddressForm, { AddressFormState } from '../../../Login/AddressForm'
import SignUpForm, {SignUpFormState} from '../../../Login/SignUpForm'
import AnnexsForm, { AnnexState} from '../../../Login/AnnexsForm'
import LoginCard from './LoginCard'

export default ({show, toggleMode}) =>{

    return(

        <LoginCard show={show} title={'Login'} className="login-sign-in-form">
   
{/* 
                <button onClick={submit} className="una-login-form-button" >  Entrar </button>
 */}
                <button className="light-button" onClick={toggleMode}> Me Cadastrar  </button>  

                
        </LoginCard>
    )
}