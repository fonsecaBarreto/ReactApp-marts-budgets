import { global } from '../global'
import { MakeApi } from '../helpers/ApiFactory'
import { errorHandler } from '../helpers/ErrorHandler'

export const martApi = MakeApi(`${global.base_url}/suggestions`, errorHandler, global.storage_key_admin)

export const listSuggestions = async () =>{

  const { data } =await martApi.send({method: "GET", url:`/`})
  return data
}
