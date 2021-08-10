import React from 'react'

export default ({value, setValue}) =>{

    return (

        <div className="strict-info-content">
            <div className="login-check-box">           
                <input type="checkbox" checked={value} onChange={(e)=>{
                    setValue(!value) 
                }}></input>

                <label> Declaro-me favorável a disponibilizar os meus dados cadastrais à fornecedores.
                </label>
            </div>
        </div>
    )
}