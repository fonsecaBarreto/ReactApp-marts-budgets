import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const martApi = MakeApi(`${global.base_url}/marts`, errorHandler, global.storage_key_admin)

export const listMartsService = async () => {
  const { data } = await martApi.send({method: "get", url:"/"}) 
  return data
}

export const joinService = async (id) => {
  const { data } = await martApi.send({method: "patch", url:`/${id}/join`}) 
  return data
}

export const saveMartService = async ( inputs ) => {
  const { id, name, email, phone, cnpj_cpf, transfer_allowed, password, passwordConfirmation } = inputs
  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'

  const data = id ? { name, email, phone, cnpj_cpf, transfer_allowed } :
   { name, email, phone, cnpj_cpf, transfer_allowed, password, passwordConfirmation  }

  const resp = await martApi.send({method: METHOD, url:URL, data })
  return resp.data

}

export const findMartService = async ( id ) => {
  const resp = await martApi.send({method: 'GET', url: `/${id}` })
  return resp.data

}
