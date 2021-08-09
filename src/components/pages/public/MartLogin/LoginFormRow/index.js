import React, { useState } from 'react'
import './style.css'

export const MakeTextInput = ({value, onInput}) =>{
    return {
        type: "text",
        value, onInput
    }
}
export const MakeSelectInput = ({value, onInput, list}) =>{
    return {
        type: "select",
        value, onInput,
        list
    }
}

export default ( { className, label, placeholder, error, children, input, fixedLabel=true, value }) =>{
    const [ focused, setFocused ] = useState(false)
    
    return (
        <div className={`login-form-row ${className} ${error ? "warning" : ''}`} onFocus={() =>setFocused(true)} onBlur={()=>setFocused(false)}>
            <label className={`${ (focused || input?.value || value) ? 'show' : ''} ${fixedLabel ? 'show' : ''}`} >{label}</label> 

            {
                input &&
                <React.Fragment>
                    {input.type === "select" ?
                        <select value={input.value} onChange={input.onInput}> 
                            { input.list.map((item, i)=>( <option key={i}value={item.value}>{item.label}</option> ))}
                        </select>
                        :
                        <input  placeholder={ placeholder || '' /* ? placeholder : (!focused && label) ? label : '' */} value={input.value} type={input.type}  onInput={input.onInput}>    
                        </input>
                    }
                </React.Fragment>
            }

            { children && children }

            {error && 
                <span className="login-form-error">
                    {error}
                </span>
            }
        </div>
    )
}