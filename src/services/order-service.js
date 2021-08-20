import { global } from './global'
import { MakeApi } from './helpers/ApiFactory'
import { errorHandler } from './helpers/ErrorHandler'

export const orderAPi = MakeApi(`${global.base_url}/orders`, errorHandler, global.storage_key_mart)


export const makeOrder = async (inputs) =>{

  const { forecast, quantity, product } = inputs;
  const body = {  forecast, quantity, product_id: product.id  }
  const { data } =await orderAPi.send({method: "POST", url:`/make`, data: body})
  return data
}


/* admins */

export const adminOrderAPi = MakeApi(`${global.base_url}/orders`, errorHandler, global.storage_key_admin)


export const listOrders = async (inputs) =>{
  const { brands, product_name, forecast } = inputs


  var d = ''
  if(forecast){

    const today = new Date()
    
    today.setDate(today.getDate() + Number(forecast));
    d = today.toJSON()
  }

  var query  = `?p=${product_name}&d=${d}`


  if(brands.length > 0){
    brands.forEach(brand=>{
      query+=`&b=${brand.value}` 
    })
  }



  const { data } = await adminOrderAPi.send({method: 'GET', url: `/list${query}`})

  return data
}