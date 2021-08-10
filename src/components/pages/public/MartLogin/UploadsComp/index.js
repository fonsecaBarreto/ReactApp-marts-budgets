import React, { useEffect, useState } from 'react'
import './style.css'

import { AiOutlineFilePdf, AiOutlineFileImage, AiOutlineFile } from 'react-icons/ai'
import { AiFillWarning } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
const fileInput = document.createElement('input')
fileInput.type="file"
fileInput.multiple = true

export const UploadState = () =>{
    const [files, setFiles ] = useState([])

    const appendFiles = (newValues) =>{
        setFiles(prev => ([...prev, ...newValues ]))
    }

    const removeFileByIndex = (index) =>{
        const spliced = [ ...files ]
        spliced.splice(index,1)
        setFiles(spliced)
    }

    return ( { files, setFiles, appendFiles, removeFileByIndex })
}


export default ({ files, setFiles, appendFiles, removeFileByIndex, errors }) => {

    const [ wheresError, setWheresError ] = useState('')

    useEffect(()=>{
        if(errors?.['annexs']){
            setWheresError(errors['annexs'])
        }
    },[errors])

    const submit = (e) =>{
        e.preventDefault();
        fileInput.click()
        fileInput.onchange = e => {
            e.preventDefault();
            const input = e.target;
            appendFiles( input.files)
        }  
    }

    return (<div className="login-uploads-componenet">

        <div className="login-uploads-info">
            <h4> Seu cadastro passará por uma validação: </h4>
            <span>Para acelerar esse processo, anexe os seguintes documentos (opcional). </span>
            <ul >
                <li>  Contrato Social </li>
                <li>  Copia da inscrição estadual </li>
                <li>  Comprovante de Endereço </li>
                <li>  Referencia Bancaria </li>
                <li>  Boletos de compras em outras empresas</li>
            </ul>
        </div>

        <div className="lup-header">
            <button onClick={submit}> Adicionar </button>
             <span className="muted "> { files.length == 0 ? "Nenhum Arquivo Selecionado" : `${files.length} arquivos selecionados` } </span> 
        </div>
        { files.length > 0 && 
            <div className="lup-body">
                {  
                    files.map((f,i)=>{
                        return ( <Item f={f} key={i} index={i} onDelete={removeFileByIndex} warning={ wheresError && wheresError == f.name ? true : false}></Item> )
                    })
                }
            </div>
        }
    </div>)
}


export const Item = ({f, onDelete, index, warning}) =>{

    const whichIcon = (name) =>{
        var ext = name.substring(name.lastIndexOf('.')+1, name.length) || name;
        if(["jpg","jpeg","png"].includes(ext)) return <AiOutlineFileImage></AiOutlineFileImage>; 
        else if(["pdf"].includes(ext)) return <AiOutlineFilePdf></AiOutlineFilePdf>;
        return <AiOutlineFile></AiOutlineFile>;
    }
    const handleDelete = (e) =>{
        e.preventDefault()
        onDelete(index)
    }


    return (
        <span className={`lup-body-item ${ warning ? "warning" : ""}`}>
            <span className="lup-bi-icon">
              {  warning ? <AiFillWarning></AiFillWarning> : whichIcon(f.name) }
            </span>
            <span className="lup-bi-name"> {f.name} </span>
            <button className="lup-bi-close" onClick={handleDelete}> <FaTimes></FaTimes></button>
        </span>
    )
}