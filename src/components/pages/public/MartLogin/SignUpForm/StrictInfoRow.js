import React from 'react'
import FileInput from '../../../../utils/AppInputs/FileInput'
export default ({value, setValue, onFile, file}) =>{

    return (

        <div className="strict-info-content">

            <div className="login-warnin-texts">
                <h4> Seu cadastro pássara por uma validação</h4>
                <span> Para Acelerar esse processo é opcional, anexo de um documento capaz de comprovar a sua identidade como pessoa fisica ou jurica </span>
            </div>

            <FileInput value={file} setValue={onFile}></FileInput>

            <div className="login-check-box">
                                
                <input type="checkbox" checked={value} onChange={(e)=>{
                    setValue(!value) 
                }}></input>

                <label> Declaro favorável a disponibilização de meus dados cadastrais a fornecedores
                </label>
            </div>
        </div>
    )
}