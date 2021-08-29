import { combineReducers } from 'redux'
import { globalReducer } from './global'
import { AdminReducer } from './admins'
import { MartReducer } from './marts'
import { dialogReducer } from './dialog'

export const Reducers = combineReducers({ 
    global: globalReducer,
    admins: AdminReducer,
    marts: MartReducer,
    dialog: dialogReducer
})