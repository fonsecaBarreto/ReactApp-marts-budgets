import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const categoryApi = MakeApi(`${global.base_url}/categories`, errorHandler, global.storage_key_admin)

export const listCategoriesService = async () => {
  const { data } = await categoryApi.send({method: "get", url:"/"}) 
  return data
}

export const listCategoriesTreeService = async (list) => {
  const { data } = await categoryApi.send({method: "get", url:`/tree${list ? '?v=list ': ''}`}) 
  return data
}

export const findCategoriesService = async ( id ) => {
  const resp = await categoryApi.send({method: 'GET', url: `/${id}` })
  return resp.data
}

export const removeCategoriesService = async ( id ) => {
  const resp = await categoryApi.send({method: 'DELETE', url: `/${id}` })
  return resp.data
}

export const saveCategoriesService = async ( inputs ) => {
  console.log(inputs)
  const { id, name, category_id } = inputs

  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'
  const data = { name, category_id }

  const resp = await categoryApi.send({method: METHOD, url:URL, data })
  return resp.data

}

