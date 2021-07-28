import React from "react"
import './style.css'
import { withRouter } from 'react-router-dom'
export default withRouter(({history}) =>{
    const voltar = ( ) => {
        history.push('/')
    }
    return (
        <div id="budget-page">
            PAGINA DE ORÇAMENTO
            <button onClick={voltar}> Voltar </button>
        </div>
    )
})