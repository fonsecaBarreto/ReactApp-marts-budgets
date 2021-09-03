import './style.css'
import { GiPartyPopper } from 'react-icons/gi'
import { useEffect, useState } from 'react'
export default ({ mart }) =>{

    const [ firstSuggestions, setFirstSuggestions ] = useState(false)

    useEffect(()=>{
        if(mart?.checkList){
            console.log(mart)
            setFirstSuggestions(mart.checkList.first_suggestions)
        }
    },[mart])
    return (
        <section>
            <h2>{ firstSuggestions == false ? 'Bem Vindo ao Una Compras!' : "Sua opinião é muito importante para nós"}</h2>
            <h3>{ firstSuggestions == false  ? 'Antes de Continuar, Queremos saber um pouco mais sobre o seu Estabelecimento' : "Ajude-nos a melhorar Nosso sistema para melhor atendê-lo"}  </h3>
        </section>
    )
}