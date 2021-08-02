import React from 'react'
import './style.css'

const fileInput = document.createElement('input')
fileInput.type="file"
fileInput.multiple = true

export default ({ src, setSrc, file, setFile }) =>{

    const submit = (e) =>{
        e.preventDefault();
        fileInput.click()

        var reader = new FileReader();

        fileInput.onchange = e => {
            e.preventDefault();
            const input = e.target;

            reader.onload = function(event) {
                setFile(input.files[0])
                setSrc(event.target.result)
            };
    
            reader.readAsDataURL(input.files[0]);
        }  
    }
    return (
        <div className="image-input">
            <div className={`image-content ${!src ? 'empty' : ''}`} onClick={submit}>

                <img src={src}></img>
            </div>
     
        </div>
    )
}