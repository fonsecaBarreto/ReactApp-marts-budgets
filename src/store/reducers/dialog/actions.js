
import { MakeFailure, MakeMessage, MakeSuccess } from '../../../components/utils/WarningDialog'
export const setDialogState = value => ({
    type: "SET_DIALOG_STATE",
    payload: value
})

export const closeDialogState = () => ({
    type: "CLOSE_DIALOG",
    payload:  null
})

/*  */
export const showFailure = (message, description, title, done) => ({
    type: "SET_DIALOG_STATE",
    payload: MakeFailure(message, description, title, done)
})



export const showSuccess = (message, description, title, done) => ({
    type: "SET_DIALOG_STATE",
    payload: MakeSuccess(message, description, title, done)
})


export const showMessage = (message, title) => ({
    type: "SET_DIALOG_STATE",
    payload: MakeMessage(message, title)
})

