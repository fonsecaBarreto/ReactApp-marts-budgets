import React from 'react'
import './style.css'
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
        <div className="app-file-input">
            <button onClick={submit}> selecionar </button>
            <span className="small muted">  { value ? value.name : "Nenhum arquivo selecionado." } </span> 
        </div>
        
    )
}