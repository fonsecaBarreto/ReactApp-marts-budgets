import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const itemsApi = MakeApi(`${global.base_url}/items`, errorHandler, global.storage_key_mart)
export const martscategoryApi = MakeApi(`${global.base_url}/categories`, errorHandler, global.storage_key_mart)
export const martsProductsApi = MakeApi(`${global.base_url}/products`, errorHandler, global.storage_key_mart)
export const martsBrandsApi = MakeApi(`${global.base_url}/brands`, errorHandler, global.storage_key_mart)

/* categories */

export const ListCategoriesScrew = async (offset=0, text="") => {
  const { data } = await martscategoryApi.send({method: "get", url:`/screw?v=${text}&o=${offset}`}) 
  return data
}

export const listPrimariesService = async ( ) => {
    const { data } = await martscategoryApi.send({method: "get", url:"/primaries"}) 
    return data
}

/* products */
export const listBrandsService = async ( ) => {
    const { data } = await martsBrandsApi.send({method: "get", url:"/list"}) 
    return data
}

export const ItemsSearchService = async (params, offset) => {

  const  { categories, brands, text } = params

  var query  = `?v=${text}&o=${offset}`

  if(categories.length > 0){
    categories.forEach(category=>{
      query+=`&c=${category.id}` 
    })
  }
  if(brands.length > 0){
    brands.forEach(brand=>{
      query+=`&b=${brand.id}` 
    })
  }

  console.log(query)

  const { data } = await itemsApi.send({method: "get", url:`/search${query}`}) 
  return data
}


export const ProductsSearchService = async (params, pageIndex) => {

  const  { categories, brands, text } = params

  var query  = `?v=${text}&p=${pageIndex}`

  if(categories.length > 0){
    categories.forEach(category=>{
      query+=`&c=${category.id}` 
    })
  }
  if(brands.length > 0){
    brands.forEach(brand=>{
      query+=`&b=${brand.id}` 
    })
  }

  const { data } = await martsProductsApi.send({method: "get", url:`/search/${query}`}) 
  return data
}
