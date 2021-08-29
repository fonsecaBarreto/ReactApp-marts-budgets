import { global } from '../global'
import { MakeApi } from '../helpers/ApiFactory'
import { errorHandler } from '../helpers/ErrorHandler'

export const martApi = MakeApi(`${global.base_url}/suggestions`, errorHandler, global.storage_key_mart)
export const MakeSuggestions = async (inputs) =>{
  const items = inputs?.items
  const body = items && { items: JSON.stringify(items) }
  const { data } =await martApi.send({method: "POST", url:`/make`, data: body})
  return data
}
