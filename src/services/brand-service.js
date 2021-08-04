import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const brandApi = MakeApi(`${global.base_url}/brands`, errorHandler, global.storage_key_admin)

export const ListBrandsScrew= async (offset=0, text="") => {
  const { data } = await brandApi.send({method: "get", url:`/screw?v=${text}&o=${offset}`}) 
  return data
}

export const listBrandsService = async () => {
  const { data } = await brandApi.send({method: "get", url:"/"}) 
  return data
}


export const findBrandsService= async ( id ) => {
  const resp = await brandApi.send({method: 'GET', url: `/${id}` })
  return resp.data
}

export const removeBrandsService = async ( id ) => {
  const resp = await brandApi.send({method: 'DELETE', url: `/${id}` })
  return resp.data
}

export const saveBrandsService = async ( inputs ) => {

  const { id, name, } = inputs

  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'
  const data = { name }

  const resp = await brandApi.send({method: METHOD, url:URL, data })
  return resp.data

}

