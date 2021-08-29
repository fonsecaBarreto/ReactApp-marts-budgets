import { global } from '../global'
import { MakeApi } from '../helpers/ApiFactory'
import { errorHandler } from '../helpers/ErrorHandler'

export const ratingApi = MakeApi(`${global.base_url}/rating`, errorHandler, global.storage_key_admin)

export const listRatings = async () =>{
  const { data } =await ratingApi.send({method: "GET", url:`/`})
  return data
}
