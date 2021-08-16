import React, { useEffect, useState } from 'react'
import '../style.css'
import './style.css'

import { listBrandsService } from '../../../../../services/mart-product-search-service'


export default ({state}) =>{

    const [ loading, setLoading ] = useState(false)
    const [ brands, setBrands ] = useState([])

    const toggleToTheList = (brand) =>{
        var queryBrands = state.queries.brands
        
        if(queryBrands.includes(brand)){
            queryBrands = queryBrands.filter(b=>(b.id != brand.id))
        }else{
            queryBrands.push(brand)
        }
        
        state.setBrands(queryBrands)
    }

    const search = () => {
        state.loadFeed(0, false)
    }

    const clearList = () =>{  state.setBrands([]) }

    useEffect(()=>{
        if(brands.length == 0 ){
            setLoading(true)
            listBrandsService(false)
            .then( setBrands)
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
                    <li onClick={()=>clearList()} className={state.queries.brands.length ===0 ? 'search-selector-selected' : ''} > 
                        <input readOnly type="checkbox" checked={state.queries.brands.length ===0 }></input>Todas Marcas
                    </li>
                    {brands.map((b,i)=>( 
                       
                        <li key={i} 
                            onClick={()=>toggleToTheList(b)} 
                            className={state.queries.brands.includes(b) ? 'search-selector-selected' : ''} > 

                            <input readOnly type="checkbox" checked={state.queries.brands.includes(b)}></input>
                            {b.name} 
                        </li> 
                    ))}
                </ul>
            </nav>
            }
            <button className="soft-btn desktop-only" onClick={search}>Aplicar</button>
        </div>
    )
}