import React, { useState, useEffect, useRef, useCallback } from "react"
import { HiOutlineEmojiSad } from 'react-icons/hi'

export default ({state, component:Component, onItemClick}) => {

    const { data, text, setText, show, setShow, loading,  handleOnLoad } = state

    const observer = useRef()
    const lastItemRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && (data.data.length < data.subTotal) ) { return handleOnLoad(data.data.length, false)}})
        if (node) observer.current.observe(node)
    }, [loading, data, data.data, data.subTotal])

    const handleItemClick = (item) =>{
        setShow(false)
        setText("")
        onItemClick(item)
    }

    return (
        <div className={`app-custom-selector-body ${show? 'show' : ''}`} >
            <div className="acsb-flow">
                { data.data.length > 0 && data.data.map((n,i)=>{
                    return (  
                    <div className="app-custom-selector-item-wrapper" key={i} onClick={()=>handleItemClick(n)}> 
                        <Component entry={n}></Component>
                    </div>)
                })}

                <div ref={lastItemRef}> </div>
        
                {  loading && <span className="app-custom-selector-item-wrapper option-muted"> Procurando... </span> }

                {  !loading && data.data.length === 0  && <span className="app-custom-selector-item-wrapper option-muted">  Nada encontrado  <HiOutlineEmojiSad></HiOutlineEmojiSad> </span> } 
            </div>
        </div>
    )
}