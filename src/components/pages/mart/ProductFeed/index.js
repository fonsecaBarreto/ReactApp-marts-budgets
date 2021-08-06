import React, { useState, useEffect } from "react"
import './style.css'
import { ProductsSearchService } from '../../../../services/mart-product-search-service'
import ProductFeedItem from "./ProductFeedItem"

const INITIAL_DATA = { 
    total: 0,
    subTotal: 0, // total to the searchs
    totalPages: 0,
    currentPage:0,
    products: [], 
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

    const loadFeed = async ( pageIndex ) => {
        setLoading(true) 
        setData(INITIAL_DATA) //set loading //will clean all
        try{ 
            const result = await ProductsSearchService(queries, pageIndex)
            return setData(result) 
        }catch(err){ console.error(err, "Não foi possivel Encontrar Produtos")}
        finally{ setLoading(false)}
    }
    const setCategories = (categories) => { setQueries(prev => ({ ...prev, categories }))}
    const setBrands = (brands) => { setQueries(prev => ({ ...prev, brands }))}
    const setText = (text) => { setQueries(prev => ({ ...prev, text }))}

    return { data, setData, queries, setQueries, loading, setLoading, loadFeed, setCategories, setBrands, setText }
}


export default ({state}) =>{

    const { data, setData, loadFeed, loading } = state

    return (
        <div className="mart-product-feed">
            {  loading ? 'Carregando ...' :

                <React.Fragment>


                    <div className='mart-product-feed-flow'>
                        { data.products.map((p,i)=>{
                            return (
                                <ProductFeedItem key={i} product={p} ></ProductFeedItem>
                                )
                            })}
                    </div> 

                    <nav className="pages-nav"> 
                        {
                            [...Array(data.totalPages)].map((n,i)=>(
                                <button className="pages-nav-btn" key={i} onClick={()=>loadFeed(i)}>{i + 1}</button>
                                ))
                            }
                     
                        <span>

                            {data.currentPage}
                        </span>

                    </nav>
                </React.Fragment>
            }

            
        </div>
    )
}