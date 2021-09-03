import React, { useEffect, useState } from 'react'
import './style.css'
import NavListLink from './NavListLink'
import { useHistory, useLocation} from 'react-router-dom'
import ActionButton from '../ActionButton'
import { FaUserCircle } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { logoutService } from '../../../../../services/mart-login-service'

const ITEMS = [
    { to:"/inicio", hash:"", label: "Inicio" },
    { to:"/inicio", hash:"#objetivos", label: "Objetivos" },
    { to:"/inicio", hash:"#cadastrar", label: "Cadastrar Grátis" }
]

export default ({ mart, className }) =>{

    const history = useHistory()
    const location = useLocation()
    const [currentPage, setCurrentPage ] = useState(['',''])

    const goTo = (to) => {  history.push(to)  } 

    useEffect(()=>{
        setCurrentPage([location.pathname, location.hash])
    },[location])

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
                    { ITEMS.map((item, i) =>( <NavListLink {...item} key={i} selected={ ( (['inicio','/inicio', '/inicio/']).includes(currentPage?.[0]) && currentPage?.[1] == item.hash ) ? true : false}> </NavListLink> ))}
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