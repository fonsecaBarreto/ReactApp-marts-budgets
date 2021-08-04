import React, { useState, useEffect, useRef, useCallback } from "react"
import './style.css'
import SelectorItem from './Item'
import { FaTimes, FaXbox  } from 'react-icons/fa'
import { useOutsideAlerter } from './Utils'
const INITIAL_DATA = {
    total: 0, //Real amount
    subTotal: 0, //queries total
    data: []
}

const INITIAL_QUERY = {
    text:""
}

export const useIntersection = (cb) =>{

    const observer = useRef()
    
    const intersectionRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();

        /* observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
                cb();
              
        }}) */

        if (node) observer.current.observe(node);

    }, [])

    return { intersectionRef }
}

export const SelectorState = (onLoad) =>{

    const [ data, setData ] = useState({ ...INITIAL_DATA})
    const [ queries, setQueries ] = useState({ ...INITIAL_QUERY})
    const [ loading, setLoading ] = useState(false)

    const setText = (value) => setQueries(prev=>({...prev, text: value}))

    useEffect(()=>{ handleOnLoad(0) },[ ]) //going to load from offset 0, with no queries

    const handleOnLoad = async ( offset = 0, clear = false) => {
        if(clear === true) setData(prev => ( { ...INITIAL_DATA } ));
        setLoading(true)
        try{
            const result  = await onLoad(offset, queries )
            const { total, subTotal, data } = result
            return setData( prev => ({ ...prev, total, subTotal, data: clear ? data : [ ...prev.data, ...data ]}))
        }catch(err){ }
        finally{ setLoading(false)}
    }

/*     const { intersectionRef } = useIntersection(()=>{
        console.log("inserction")
    }) */
    /*   if(feed.data.length < feed.subTotal) return loadFeed(feed.data.length, true) */

   /*  const observer = useRef()
    const lastItemRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
                if(feed.data.length < feed.subTotal) return loadFeed(feed.data.length, true)
        }})
        if (node) observer.current.observe(node)
    }, [loading, feed, feed.data, feed.subTotal]) */

    return { data, setData, loading, setLoading, handleOnLoad, text:queries.text, setText }
}

export default ({ onLoad, value, onInput }) => {

    const selectorState = SelectorState(onLoad)
    const [ show, setShow ] = useState(false)
    const { data, setData, loading, handleOnLoad, text, setText } = selectorState
  
   /*  const componentRef = useRef(null);
    useOutsideAlerter(componentRef, () =>{ setShow(false)  }); */


    /* counter */

   /*  const [count, setCount] = useState(0)
    const interval = useRef(null) 
    useEffect(() => { if (count >= 1) {  
        clearInterval(interval.current); setCount(0)
        selectorState.loadFeed();
     }}, [count]) */

   /*  const startCounter = (e) => {
        var timeOut = 240
        onInput({label:"", value:""})
        if(e.key === "Backspace" && feed.queries.text.length > 0) timeOut = 800 ;
        clearInterval(interval.current); setCount(0)
        interval.current = setInterval(() => {
            setCount(prevState => prevState + 1)
        }, timeOut) 
    }
 */
    const select = (item) =>{
        setShow(false)
        onInput(item)
    }

    const handleText = (e) =>{
        setText(e.target.value)
       /*  setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: e.target.value } } ))  */
    } 

    return(
        <div className="app-custom-selector" >
            <button load> </button>
           
            <input type="text" onClick={()=>setShow(true)} onInput={handleText} onKeyUp={()=>{}} value={text}> </input> 

          {/*   { 
                value?.label && <span className="float-select-item" onClick={()=>{  onInput({label:"", value:""})}}> { value.label }
                <FaTimes></FaTimes>
                </span>
             } */}

            <div className={`app-custom-selector-body ${show? 'show' : ''}`} >
                <div className="acsb-flow">
                    { data?.length > 0 && data.map((n,i)=>{
                        return (  
                        <div className="app-custom-selector-item-wrapper" key={i} onClick={()=>select(n) }> 
                            { n.name}
                        </div>)
                    })}

                {/*     <div ref={intersectionRef}> </div>
            
                    {  loading && <span className="app-custom-selector-item-wrapper"> Procurando </span> }

                    {  !loading && data.length === 0  && <span className="app-custom-selector-item-wrapper muted">  Nada encontrado </span> } */}
                </div>
            </div>

        </div>
    )
}