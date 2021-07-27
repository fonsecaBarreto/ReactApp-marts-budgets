import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const adminloginApi = MakeApi(`${global.base_url}/admins/login`, errorHandler, global.storage_key_admin)

export const signInService = async (data) => {
  const result = await adminloginApi.send({method: "post", url:"/signin", data}) 
  localStorage.setItem(global.storage_key_admin, result.data['accessToken'])
}

export const authService = async () =>{
  const { data } = await adminloginApi.send({method: "post", url:"/auth"}) 
  return data
} 

export function logoutService() {
  localStorage.removeItem(global.storage_key_admin)
  window.location.href="/"
}