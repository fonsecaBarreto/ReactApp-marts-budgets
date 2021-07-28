import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

/* export const fileApi = MakeApi(`${global.base_url}/files`, errorHandler) */


export const getFilePath = (name, access="admin") => {
    const token = localStorage.getItem(access === "admin" ? global.storage_key_admin : global.storage_key_mart)
    return `${global.base_url}/files?v=${name}&a=${token}`
}

