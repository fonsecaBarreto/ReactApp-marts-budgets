import React from 'react'
import './style.css'
import { FaTimes } from 'react-icons/fa'

export default function Dialog({show, onClose, children, title, icon, loading}){

    return (
        <React.Fragment>
        { !show? undefined
            :<div className={"app-dialog app-padding"}>

                <div className="app-dialog-content bd-blue">

                    <div className="app-dialog-header ">
                       { icon && <span> {icon}</span>}
                       { title && <span>{title}</span>}
                        <button onClick={onClose} className="adc-close"> 
                            <FaTimes> </FaTimes>
                        </button>
                    </div>

                    <div className={`app-dialog-body ${loading ?' div-loading' : ''}`}>
                        {children}
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    )
}