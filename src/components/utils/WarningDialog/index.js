import React, {useState} from 'react'
import './style.css'
import Dialog from '../Dialog'
import SuccessAnimation from './SuccessAnimation'
import { FiAlertCircle } from 'react-icons/fi'


const DIALOG_INITIAL_DATA = {
    show: false,
    title: "",
    content: ""
}

export const MakeFailure = (message, description, title, done) => ({ 
    ...DIALOG_INITIAL_DATA, show: true,
    title:"Atenção!" || title, 
    onResult: done,
    content: (
        <React.Fragment>
            <span className="wd-icon"> 
                <FiAlertCircle></FiAlertCircle>
            </span>
            <span className="wd-bold">{message}</span>
            <br/>
            {description && <span className="wd-small"> 
                {description}
            </span>}
    </React.Fragment>)
})

export const MakeSuccess = (message, description, title, done) => ({ 
    ...DIALOG_INITIAL_DATA, show: true,
    title:"Sucesso!" || title, 
    onResult: done,
    content:(
        <React.Fragment>
            <span className="wd-icon"> 
                <SuccessAnimation></SuccessAnimation>
            </span>
            <span className="wd-bold">{message}</span> <br/>
            { description && <span className="wd-small"> {description} </span> }
        </React.Fragment>
    )
})


export const MakeMessage = (message, title) =>  ({ 
    ...DIALOG_INITIAL_DATA, show: true,
    title:"Sucesso!" || title, 
    content: message
})
  
  
export function WarningState(){
    const [ dialogconfig, setDialogConfig ] = useState({ ...DIALOG_INITIAL_DATA})
    const closeDialog = () =>  setDialogConfig ({ ...DIALOG_INITIAL_DATA })
    const showMessage = (message, title) =>  setDialogConfig (MakeMessage(message, title))
    const showSuccess = (message, description, title, done) =>  setDialogConfig (MakeSuccess(message, description, title, done))
    const showFailure = (message, description, title, done) =>  setDialogConfig (MakeFailure(message, description, title, done))
    return { closeDialog, showFailure, showSuccess, showMessage, dialogconfig }
}


export default function WarningDialog ({ config, onClose  }){
    if(!config) return null
    const { title, content, show, onResult } = config
    const ok = async () =>{
        onResult && await onResult()
        return onClose()
    }
    return ( 
        <Dialog show={show} onClose={onClose} title={title || "..."}>
            <div className="warning-dialog"> 
                <span className="wd-content">{content}</span>

                <div className="wd-btns">
                    <button  className="wdbutton" onClick={ok}>Ok</button>
                </div>
            </div>
        </Dialog>
    )
}