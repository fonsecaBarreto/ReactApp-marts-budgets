import { combineReducers } from 'redux'
import { globalReducer } from './global'

export const Reducers = combineReducers({ 
    global: globalReducer,
})