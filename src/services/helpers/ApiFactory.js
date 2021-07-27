import axios from 'axios'


export function MakeApi(base_url, errorHelper, storage_key){
  const axiosApi = axios.create({  baseURL: base_url })
  return ({
    send: ({ method, url, data, headers }) => {

      const token = localStorage.getItem(storage_key)
      axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return new Promise((resolve, reject) => {
        setTimeout( async ()=>{
          try{ 
            const result = await axiosApi({ method,url: `${base_url}${url}`, data, headers })
            return resolve(result)
          }catch(err){ return reject(errorHelper(err)) } 
        }, 1000)
      })
    }
  })
}



 

