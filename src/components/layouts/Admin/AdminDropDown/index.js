import React, { useState } from 'react'
import './style.css'
import UserImage from '../../../../assets/user.webp'
import { logoutService } from '../../../../services/admin-login-service'

export default ({admin}) =>{

    const [ show, setShow ] = useState(false)

    return (
        <React.Fragment>

            <div className="admin-drop-down" onClick={logoutService}>
                <div className="admb-user-img">
                    <img  src={UserImage} alt="Imagem do Administrador"/>
                </div>
                <span className="addb-item" > Sair </span>

               {/*  <nav className={` admin-drop-down-body ${show ? 'show' : ''} `}>
                   
                </nav> */}
            </div>

            
        </React.Fragment>
    )
}