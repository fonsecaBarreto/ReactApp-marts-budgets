import React, { useEffect, useState } from 'react'
import '../style.css'
import './style.css'

import { listBrandsService } from '../../../../../../services/mart-product-search-service'
import { AiOutlineTags } from 'react-icons/ai'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

export default ({state}) =>{
    const [ showOnMobile, setShowOnMobile ] = useState(false)
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
            <span className="search-selector-title"> 
                <AiOutlineTags></AiOutlineTags> Marcas </span>
           { loading ? "loading" :
           <React.Fragment>

              <button className="soft-btn mobile-only" onClick={()=>setShowOnMobile(!showOnMobile)}>
                <span>   { !showOnMobile ? <MdExpandMore></MdExpandMore> : <MdExpandLess></MdExpandLess> } Selecionar </span>
              </button>
                <nav className={`${showOnMobile ? '' : 'hide-onMobile'}`}>

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
            </React.Fragment>
            }
            <button className="soft-btn desktop-only" onClick={search}>Aplicar</button>
        </div>
    )
}