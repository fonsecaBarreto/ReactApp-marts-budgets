import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const martApi = MakeApi(`${global.base_url}/marts`, errorHandler, global.storage_key_admin)

export const addressApi = MakeApi(`${global.base_url}/addresses`, errorHandler, global.storage_key_admin)



export const updateAddressService = async (inputs) =>{
  const { id, address, address_region, address_number, address_postalcode, address_city, uf,  details } = inputs;
  const body = { address, address_region, address_number, address_postalcode, address_city, uf,  details }
  const { data } =await addressApi.send({method: "PUT", url:`/${id}`, data: body})
  return data
}



export const listMartsService = async () => {
  const { data } = await martApi.send({method: "get", url:"/"}) 
  return data
}

export const listMartsWithFilterService = async (params={}) => {
  const offset = params.offset || 0
  const queries = params.queries || {}
  const text = queries.text || ''
  const status = queries.status || 0
  const { data } = await martApi.send({method: "get", url:`/list?v=${text}&o=${offset}&s=${status}`}) 
  return data
}

export const joinService = async (id) => {
  const { data } = await martApi.send({method: "patch", url:`/${id}/join`}) 
  return data
}

export const findMartService = async ( id ) => {
  const resp = await martApi.send({method: 'GET', url: `/${id}` })
  return resp.data

}

export const removeMartService = async ( id ) => {
  const resp = await martApi.send({method: 'DELETE', url: `/${id}` })
  return resp.data
}

export const saveMartService = async ( inputs ) => {
  const { id, name, email, phone, cnpj_cpf, transfer_allowed, password, passwordConfirmation, responsible_name, financial_email, corporate_name, obs, address } = inputs
  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'

  const data = id ? { name, email, phone, cnpj_cpf, transfer_allowed, responsible_name, financial_email, corporate_name, obs } :
   { name, email, phone, cnpj_cpf, transfer_allowed, password, passwordConfirmation, responsible_name, financial_email, corporate_name, obs, address: JSON.stringify(address)  }

  const resp = await martApi.send({method: METHOD, url:URL, data })
  return resp.data

}