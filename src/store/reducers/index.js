import { combineReducers } from 'redux'
import { globalReducer } from './global'
import { AdminReducer } from './admins'

export const Reducers = combineReducers({ 
    global: globalReducer,
    admins: AdminReducer
})