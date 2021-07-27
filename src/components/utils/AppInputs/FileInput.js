import React from 'react'

const fileInput = document.createElement('input')
fileInput.type="file"
fileInput.multiple = true

export default ({ value, setValue }) => {

    const submit = (e) =>{
        e.preventDefault();
        fileInput.click()
        fileInput.onchange = e => {
            e.preventDefault();
            const input = e.target;
            setValue(input.files[0])
        }  
    }

    return (
        <div>
            <button onClick={submit}> Selecionar </button>
            <span className="small muted">  { value ? value.name : "Nenhum arquivo Selecionado" } </span> 
        </div>
        
    )
}