import React, { useState } from 'react'
import './style.css'
import UserImage from '../../../../assets/user.webp'
import { logoutService } from '../../../../services/admin-login-service'

export default ({admin}) =>{

    const [ show, setShow ] = useState(false)

    return (
        <React.Fragment>

            <div className="admin-drop-down" onClick={()=>setShow(!show)}>
                <div className="admb-user-img">
                    <img  src={UserImage} alt="Imagem do Administrador"/>
                </div>

                <nav className={` admin-drop-down-body ${show ? 'show' : ''} `}>
                    <span className="addb-item" onClick={logoutService}> Sair </span>
                </nav>
            </div>

            
        </React.Fragment>
    )
}