import React, { useState, useEffect, useRef, useCallback } from "react"
import './style.css'
import { ItemsSearchService } from '../../../../../services/mart-product-search-service'
import ProductItemClientView from "./ItemView"
import LoadingComp from '../../../../../components/utils/LoadingComp'

const INITIAL_DATA = { 
    total: 0,
    subTotal: 0, // total to the searchs
    items: []
}

const INITIAL_QUERIES = {
    text: "",
    categories : [],
    brands: [],
}

export const FeedState = () =>{
    
    const [ queries, setQueries] = useState(INITIAL_QUERIES)
    const [ data, setData ] = useState(INITIAL_DATA)
    const [ loading, setLoading ] = useState(false)

    useEffect(()=>{ loadFeed(0) },[ ]) //going to load from page 0, with no queries

    const setCategories = (categories) => { setQueries(prev => ({ ...prev, categories }))}
    const setBrands = (brands) => { setQueries(prev => ({ ...prev, brands }))}
    const setText = (text) => { setQueries(prev => ({ ...prev, text }))}

    const loadFeed = async ( offset = 0, append = false ) => {
        setLoading(true) 
        if(append === false) setData(INITIAL_DATA) //set loading //will clean all
        try{ 

            const result = await ItemsSearchService(queries, offset)
            setData( prev => ({ ...result, items: [ ...prev.items, ...result.items ]}))  
   
        }catch(err){ console.error(err, "Não foi possivel encontrar Items")}
         setLoading(false)
    }
   

    return { data, setData, queries, setQueries, loading, setLoading, loadFeed, setCategories, setBrands, setText }
}


export default ({ state, onItem }) =>{

    const { data,  loadFeed, loading } = state

    const observer = useRef()
    const lastItemRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && (data.items.length < data.subTotal) ) {
                const offset = data.items.length
                loadFeed(offset, true)  
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, data, data.items, data.subTotal])

    return (
        <React.Fragment>

            <div className="mart-product-feed">

                <div className='mart-item-feed-flow'>
                    { data.items.map((i,index)=>{
                        if( i.products?.length) return ( <ProductItemClientView key={index} item={i} onClick={onItem}> </ProductItemClientView> )
                    })} 
                </div> 

                <React.Fragment>
                    <div ref={lastItemRef}> </div>
                    { loading && <LoadingComp></LoadingComp> }
                    {(!loading && data.items.length === 0 ) && <span className="mart-feed-base-text muted">  Nada encontrado </span> }   
                </React.Fragment>

            </div>
    
          
        </React.Fragment>
    )
}