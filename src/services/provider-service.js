import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const providerApi = MakeApi(`${global.base_url}/providers`, errorHandler, global.storage_key_admin)

export const listProvidersService = async () => {
  const { data } = await providerApi.send({method: "get", url:"/"}) 
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
  const { id, name, email, phone } = inputs

  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'
  const data = { name, email, phone }

  const resp = await providerApi.send({method: METHOD, url:URL, data })
  return resp.data

}

