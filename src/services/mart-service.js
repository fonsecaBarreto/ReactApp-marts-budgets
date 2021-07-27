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
