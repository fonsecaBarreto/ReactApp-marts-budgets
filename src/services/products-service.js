import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const productsApi = MakeApi(`${global.base_url}/products`, errorHandler, global.storage_key_admin)


export const listProductsService = async () => {
  const { data } = await productsApi.send({method: "get", url:"/"}) 
  return data
}

export const listProductsWithFilterService = async (params={}) => {
  const offset = params.offset || 0
  const queries = params.queries || {}
  const text = queries.text || ''
  const category_id = queries.category_id || ''
  const { data } = await productsApi.send({method: "get", url:`/list?v=${text}&o=${offset}&c=${category_id}`}) 
  return data
}

export const findProductService = async ( id ) => {
  const resp = await productsApi.send({method: 'GET', url: `/${id}` })
  return resp.data
}

export const removeProductService = async ( id ) => {
  const resp = await productsApi.send({method: 'DELETE', url: `/${id}` })
  return resp.data
}

export const saveProductservice = async ( inputs ) => {

  const { id, description, presentation, stock, price, ncm, ean, sku, brand, category, image_file } = inputs

  const METHOD = id ? 'PUT' : 'POST' 
  const URL = id ? `/${id}` : '/'

  //optional values must return empty streem on formData, for some reason it seems that null is not nullable
  const formData = new FormData()
    formData.append('description',description)
    formData.append('stock',stock)
    formData.append('price',price)
    formData.append('presentation',presentation || "")
    formData.append('ncm',ncm || '')
    formData.append('ean',ean || '')
    formData.append('sku',sku || '')
    formData.append('brand_id', brand.value || '')
    formData.append('category_id', category.value || '')
    formData.append('image',image_file)

  const resp = await productsApi.send({method: METHOD, url:URL, data: formData })
  return resp.data

}

