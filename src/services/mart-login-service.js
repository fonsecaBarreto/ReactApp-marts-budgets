import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const martloginApi = MakeApi(`${global.base_url}/marts/login`, errorHandler, global.storage_key_mart)

export const signInService = async (data) => {
  const result = await martloginApi.send({method: "post", url:"/signin", data}) 
  localStorage.setItem(global.storage_key_mart, result.data['accessToken'])
}

export const forgotPasswordService = async (credentials) =>{
  await martloginApi.send({method: "post", url:"/reset-password",data:{credentials} }) 
}

export const changePassword = async (inputs) =>{
  const { password, passwordConfirmation, token } = inputs
   await martloginApi.send({method: "post", url:`/change-password?v=${token}`,data: { password, passwordConfirmation } }) 
}

export const signUpService = async (inputs) =>  {


  const { name, email, cnpj_cpf, phone, transfer_allowed, responsible_name, address, annexeses} = inputs

  const formData = new FormData()

  for (const i of Object.keys(annexeses)) {
    formData.append('annexs', annexeses[i]) 
  }

  formData.append('name',name)
  formData.append('email',email)
  formData.append('phone',phone)
  formData.append('cnpj_cpf',cnpj_cpf)
  formData.append('transfer_allowed',transfer_allowed)

  formData.append('responsible_name',responsible_name)
  formData.append('address',JSON.stringify(address))

  const {data} = await martloginApi.send({method: "post", url:"/signup", data: formData })
  return data 
}

export const authService = async () =>{
  const { data } = await martloginApi.send({method: "post", url:"/auth"}) 
  return data
} 

export function logoutService() {
  localStorage.removeItem(global.storage_key_mart)
  window.location.href="/login"
}