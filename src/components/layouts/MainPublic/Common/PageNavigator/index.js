import React, { useEffect, useState } from 'react'
import './style.css'
import NavListLink from './NavListLink'
import { useHistory } from 'react-router-dom'
import ActionButton from '../ActionButton'
import { FaUserCircle } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { logoutService } from '../../../../../services/mart-login-service'

const ITEMS = [
    { to:"/inicio", label: "Inicio" },
    { to:"/inicio/#objetivos", label: "Objetivos" },
    { to:"/inicio/#sobre", label: "Sobre" }
]

export default ({ mart, className }) =>{

    const history = useHistory()
    const [currentPage, setCurrentPage ] = useState(null)

    const goTo = (to) => {  history.push(to)  } 

    useEffect(()=>{
        if(["/inicio",'/inicio/'].includes(history.location.pathname) ){
            setCurrentPage(history.location.pathname+history.location.hash)
        }
        else{ setCurrentPage(history.location.pathname)}
    },[history.location])

    const notLoginPage = () =>{
        if(history.location.pathname !== "/login") return true;
        return false
    }
    const notMartEnv = () =>{
        if(history.location.pathname !== "/marts/orcamento") return true;
        return false
    }

    return (
        <nav className={`main-page-navigator ${className}`}>
            <section>
                <ul>
                    { ITEMS.map((item, i) =>( <NavListLink {...item} key={i} selected={currentPage === item.to ? true : false}> </NavListLink> ))}
                </ul>
            </section>

            <section>
                {mart ?
                    notMartEnv() ? 
                        <ActionButton icon={<FaUserCircle></FaUserCircle>} label={"Area do Cliente"} onClick={()=>goTo('/marts/orcamento')}></ActionButton>
                    :
                        <ActionButton icon={ <ImExit></ImExit>} label={"Sair"} onClick={logoutService}></ActionButton>
                    : notLoginPage() && <ActionButton label={"Entrar"} onClick={()=>goTo('/login')}></ActionButton>
                }
            </section>
        </nav>
    )
}