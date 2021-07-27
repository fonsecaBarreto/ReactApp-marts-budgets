
function ResultError(message, error){
    this.message = message; 
    this.name = null
    this.params = null

    if(error){
        const { message, name, params, param} = error
        this.message = message
        this.name =name
        this.params = param ? { param } :  params ? params : {}
    }
}

const NOT_FOUND = "Rota não existe."
const UNKNOWN_ERROR = "Erro inesperado."

export function errorHandler(err) {
    if(!err.response) return new ResultError(UNKNOWN_ERROR)
    const { status } = err.response
    if(status === 404 ) return new ResultError(NOT_FOUND)
    var { error } = err.response.data
    if(!error) return new ResultError(UNKNOWN_ERROR)
    return new ResultError(null,error)
}