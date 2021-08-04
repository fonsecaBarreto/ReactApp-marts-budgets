import React, { useState, useEffect, useRef, useCallback } from "react"
import './style.css'
import SelectorItem from './Item'
import { FaTimes  } from 'react-icons/fa'

const INITIAL_DATA = {
    total: 0, //Real amount
    subTotal: 0, //queries total
    data: [], // data received,
    queries: {
        text: ""
    }
}

function useOutsideAlerter(ref, todo) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) { todo() } }
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, [ref]);
}

export const SelectorState = (loadFunction, serializeTo) =>{
    const [ feed, setFeed ] = useState({ ...INITIAL_DATA})
    const [ loading, setLoading ] = useState(false)

    const setQueries = (query) => setFeed(prev=>({...prev, queries: { ...prev.queries, ...query } }))

    useEffect(()=>{ loadFeed(0,false) },[ ]) //going to load from offset 0, with no queries

    const mapData = (data) =>{
        return data.map(d=>{
            const { value, label } = serializeTo 
            return { value: d[value], label: d[label]}
        })
    }
    
    const loadFeed = ( offset = 0, append=false ) => {

        setLoading(true)
        loadFunction({ offset, queries: feed.queries })
        .then(result=>{
            const { total, subTotal, data } = result

            if(append === true) return setFeed( prev => ({ ...prev, total, subTotal, data: [ ...prev.data, ...mapData(data) ]}))

            return setFeed( prev => ({ ...prev, total, subTotal, data: mapData(data) }))
        })
        .catch(err=>{console.log(err)})
        .finally(()=>setLoading(false))
    }

    const observer = useRef()
    const lastItemRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
                if(feed.data.length < feed.subTotal) return loadFeed(feed.data.length, true)
        }})
        if (node) observer.current.observe(node)
    }, [loading, feed, feed.data, feed.subTotal])

    return { feed, setFeed, loading, setLoading, loadFeed, setQueries, 
        lastItemRef, observer}
}

export default ({ serializeTo, loadFunction, value, onInput }) => {

    const selectorState = SelectorState(loadFunction, serializeTo)
    const [ show, setShow ] = useState(false)
    const { feed, setFeed, loading,  lastItemRef, observer } = selectorState
    const [count, setCount] = useState(0)
    const interval = useRef(null) 

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () =>{
        setShow(false)
    });

    useEffect(() => { if (count >= 1) {  
        clearInterval(interval.current); setCount(0)
        selectorState.loadFeed();
     }}, [count])

    const startCounter = (e) => {
        var timeOut = 240
        onInput({label:"", value:""})
        if(e.key === "Backspace" && feed.queries.text.length > 0) timeOut = 800 ;
        clearInterval(interval.current); setCount(0)
        interval.current = setInterval(() => {
            setCount(prevState => prevState + 1)
        }, timeOut) 
    }

    const select = (item) =>{
        setShow(false)
        onInput(item)
    }

    const handleText = (e) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: e.target.value } } )) 
    } 

    return(
        <div className="app-custom-selector" ref={wrapperRef}>
           
            <input type="text" onClick={()=>setShow(true)} onInput={handleText} onKeyUp={startCounter}
            value={value?.label || selectorState.feed.queries.text} >
            
            </input> 

            { 
                value?.label && <span className="float-select-item" onClick={()=>{  onInput({label:"", value:""})}}> { value.label }
                <FaTimes></FaTimes>
                </span>
             }

            <div className={`app-custom-selector-body ${show? 'show' : ''}`} >
                <div className="acsb-flow">

                    { feed.data.map((n,i)=>{
                        return (  
                        <div className="app-custom-selector-item-wrapper" key={i} onClick={()=>select(n) }> 
                            <SelectorItem  data={n}> </SelectorItem> 
                        </div>)
                    })}

                    <div ref={lastItemRef}> </div>
            
                    {  loading && <span className="app-custom-selector-item-wrapper"> Procurando </span> }

                    {  !loading && feed.data.length === 0  && <span className="app-custom-selector-item-wrapper muted">  Nada encontrado </span> }
                </div>
            </div>

        </div>
    )
}