import Logo from '../../../../../assets/logo2.svg'
import './style.css'
import LoadingComp from '../../../../utils/LoadingComp'
export default ({children, show, title, className, loading}) =>{
    return (
        <div className={`login-card ${show ? 'show': '' } ${className} ${loading ? 'card-loading' : ''} `}>
            <img src={Logo} className="login-logo" ></img>
            <section className="login-card-content">
                <span className="login-header-text"> {title} </span>
                {children} 
                <span className="small-span">Copyright©2021, UnaCompras. Todos os direitos reservados.</span>
            </section> 
        </div>
    )
}