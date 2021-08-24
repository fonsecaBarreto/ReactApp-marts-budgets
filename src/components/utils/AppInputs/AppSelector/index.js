import React, { useState, useEffect, useRef, useCallback } from "react"
import './style.css'
import SelectorBody from './Body'
import { useOutsideAlerter, useCounter } from './Utils'
import { AiOutlineCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { HiOutlineSearchCircle } from  'react-icons/hi'
const INITIAL_DATA = {
    total: 0, //Real amount
    subTotal: 0, //queries total
    data: []
}

export const SelectorState = (onLoad) =>{
    const [ data, setData ] = useState({ ...INITIAL_DATA})
    const [ text, setText ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ show, setShow ] = useState(false)

    useEffect(()=>{ handleOnLoad(0, true) },[ ]) //going to load from offset 0, with no queries

    const handleOnLoad = async ( offset = 0, clear = false) => {
        if(clear === true) setData(prev => ( { ...INITIAL_DATA } ));
        setLoading(true)
        try{
            const result  = await onLoad(offset, text )
            const { total, subTotal, data } = result
            return setData( prev => ({ ...prev, total, subTotal, data: clear ? data : [ ...prev.data, ...data ]}))
        }catch(err){ }
        finally{ setLoading(false)}
    }

    return { data, setData, text, setText, loading, show, setShow, handleOnLoad }
}



export default ({onLoad, value,  onInput, component:Component,disabled }) =>{
    const state = SelectorState(onLoad)
    const { data, text, setText, show, setShow, loading,  handleOnLoad} = state

    const componentRef = useRef(null);
    useOutsideAlerter(componentRef, () =>{ setShow(false)  });

    const { startToCount } = useCounter(state)

    /* actions */
    const open = () =>{
        setShow(true)

    }
    const handleText = (e) =>{
        setText(e.target.value)

    }
    const handleKey = (e) =>{
        onInput()
        startToCount(e)
    }

    return (
        <div className={`app-custom-selector ${disabled ? 'disabled' : ''}`} ref={componentRef}>
       
            <span className={`acs-status ${(value.label && value.value) ? 'success' : '' }`}>
                { (value.label && value.value) ? <AiOutlineCheckCircle/> : <HiOutlineSearchCircle/> }
            </span>
            <input type="text" value={value.label || text} onInput={handleText} onClick={open} onKeyUp={handleKey}>
                
            </input>

            <span className={`acs-close ${(value.label && value.value) ? 'show' : '' }`} onClick={handleKey}>
                <AiFillCloseCircle/> 
            </span>
        
            <SelectorBody state={state} component={Component} onItemClick={onInput}></SelectorBody>

        </div>
    )
}