import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const providerApi = MakeApi(`${global.base_url}/providers`, errorHandler, global.storage_key_admin)

export const listProvidersService = async () => {
  const { data } = await providerApi.send({method: "get", url:"/"}) 
  return data
}


export const listProvidersWithFilterService = async (params={}) => {
  const offset = params.offset || 0
  const queries = params.queries || {}
  const text = queries.text || ''
  const { data } = await providerApi.send({method: "get", url:`/list?v=${text}&o=${offset}`}) 
  return data
}

export const findProviderService = async ( id ) => {
  const resp = await providerApi.send({method: 'GET', url: `/${id}` })
  return resp.data
}

export const removeProviderService = async ( id ) => {
  const resp = await providerApi.send({method: 'DELETE', url: `/${id}` })
  return resp.data
}

export const saveProviderService = async ( inputs ) => {
  const { id, name, email, phone, cnpj, obs, corporate_name, financial_email, responsible_name, address } = inputs

  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'

  const data = id ? { name, email, phone, cnpj, obs, corporate_name, financial_email, responsible_name } 
  : { name, email, phone, cnpj, obs, corporate_name, financial_email, responsible_name, address: JSON.stringify(address) }

  const resp = await providerApi.send({method: METHOD, url:URL, data })
  return resp.data

}

