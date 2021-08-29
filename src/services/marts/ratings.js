import { global } from '../global'
import { MakeApi } from '../helpers/ApiFactory'
import { errorHandler } from '../helpers/ErrorHandler'

export const martApi = MakeApi(`${global.base_url}/rating`, errorHandler, global.storage_key_mart)

export const MakeRating = async (inputs) =>{
  const { grade, description } = inputs
  const body = { grade, description }
  const { data } =await martApi.send({method: "POST", url:`/make`, data: body})
  return data
}
