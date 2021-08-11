import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const productItemApi = MakeApi(`${global.base_url}/items`, errorHandler, global.storage_key_admin)

export const ListItemsScrew = async (offset=0, text="") => {
  const { data } = await productItemApi.send({method: "get", url:`/screw?v=${text}&o=${offset}`}) 
  return data
}

export const findItemsService = async ( id ) => {
  const resp = await productItemApi.send({method: 'GET', url: `/${id}` })
  return resp.data
}

export const removeItemsService = async ( id ) => {
  const resp = await productItemApi.send({method: 'DELETE', url: `/${id}` })
  return resp.data
}

export const saveItemsService = async ( inputs ) => {
  const { id, name, description, category  } = inputs
  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'
  const data = { name, description, category_id: category.value }
  const resp = await productItemApi.send({method: METHOD, url:URL, data })
  return resp.data

}

export const listItemsWithFilterService = async (params={}) => {
  const offset = params.offset || 0
  const queries = params.queries || {}
  const text = queries.text || ''
  const { data } = await productItemApi.send({method: "get", url:`/list?v=${text}&o=${offset}`}) 
  return data
}

