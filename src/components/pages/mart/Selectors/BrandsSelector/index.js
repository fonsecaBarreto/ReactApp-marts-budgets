import React, { useEffect, useState } from 'react'
import '../style.css'
import './style.css'

import { listBrandsService } from '../../../../../services/mart-product-search-service'

export default ({state}) =>{

    const [ loading, setLoading ] = useState(false)
    const [ brands, setBrands ] = useState([])

    const toggleToTheList = (brandName) =>{
        var queryBrands = state.queries.brands
        
        if(queryBrands.includes(brandName)){
            queryBrands = queryBrands.filter(b=>(b != brandName))
        }else{
            queryBrands.push(brandName)
        }
        
        state.setBrands(queryBrands)
    }

    const clearList = () =>{
        state.setBrands([])
    }
    useEffect(()=>{
        if(brands.length == 0 ){
            setLoading(true)
            listBrandsService(false)
            .then( brands => setBrands(brands))
            .catch(()=>{})
            .finally(()=>setLoading(false))
        }
    },[])

    return (
        <div className="search-selector">
               <span className="search-selector-title"> Marcas </span>
           { loading ? "loading" :
            <nav>
                <ul>
                    <li onClick={()=>clearList()} className={state.queries.brands.length ===0 ? 'search-selector-selected' : ''} > Todos Marcas </li>
                    {brands.map((b,i)=>(
                        <li key={i} onClick={()=>toggleToTheList(b)} className={state.queries.brands.includes(b) ? 'search-selector-selected' : ''} > {b} </li>
                    ))}
                </ul>
            </nav>
            }
        </div>
    )
}