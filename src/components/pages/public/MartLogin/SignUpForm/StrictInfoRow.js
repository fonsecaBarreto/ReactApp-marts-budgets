import React from 'react'
import FileInput from '../../../../utils/AppInputs/FileInput'
export default ({value, setValue, onFile, file}) =>{

    return (

        <div className="strict-info-content">

            <div className="login-warnin-texts">
                <h4> Seu cadastro passará por uma validação: </h4>
                <span>Para acelerar esse processo, anexe um documento capaz de comprovar a sua identidade como PF ou PJ (opcional).</span>
            </div>

            <FileInput value={file} setValue={onFile}></FileInput>

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