export const searchCep = async (address_postalcode) => {
   
    const cep = address_postalcode
    if(!cep || cep.length < 8 || cep.length > 8) throw { message: "Insira um CEP valido"}
    try{
        var res = await fetch(`http://viacep.com.br/ws/${cep}/json/`, { mode: 'cors'})
        .then((res) => res.json())
        if (res.hasOwnProperty("erro")) {
            throw { message: "Cep inválido"}
        } 
        return res 
    }catch(err){ console.log(err) }
}