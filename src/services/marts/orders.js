import { global } from '../global'
import { MakeApi } from '../helpers/ApiFactory'
import { errorHandler } from '../helpers/ErrorHandler'

export const ordersAPi = MakeApi(`${global.base_url}/orders`, errorHandler, global.storage_key_mart)

export const listLatests = async () =>{

  const { data } = await ordersAPi.send({method: 'GET', url: `/latest`})

  return data
}