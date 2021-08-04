import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const categoryApi = MakeApi(`${global.base_url}/categories`, errorHandler, global.storage_key_admin)

export const ListCategoriesScrew = async (offset=0, text="") => {
  const { data } = await categoryApi.send({method: "get", url:`/screw?v=${text}&o=${offset}`}) 
  return data
}

/*  */

export const listPrimariesService = async () => {
    const { data } = await categoryApi.send({method: "get", url:"/primaries"}) 
    return data
}

export const listCategoriesService = async () => {
  const { data } = await categoryApi.send({method: "get", url:"/"}) 
  return data
}

export const listCategoriesWithFilterService = async (params={}) => {
  const offset = params.offset || 0
  const queries = params.queries || {}
  const text = queries.text || ''
  const { data } = await categoryApi.send({method: "get", url:`/list?v=${text}&o=${offset}`}) 
  return data
}


export const listCategoriesTreeService = async () => {
  const { data } = await categoryApi.send({method: "get", url:`/tree`}) 
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

