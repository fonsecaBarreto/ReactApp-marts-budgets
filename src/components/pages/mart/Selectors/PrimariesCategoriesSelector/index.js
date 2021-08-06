import React, { useEffect, useState } from 'react'
import '../style.css'
import './style.css'

import { listPrimariesService } from '../../../../../services/mart-product-search-service'


export default ({state}) =>{

    const [ loading, setLoading ] = useState(false)
    const [ categories, setCategories ] = useState([])

    const handleInput = (result) => {
      /*   state.setCategories([result.value])
        setvalue(result) */
    }

    const toggleToTheList = (category) =>{
        var queryCategories = state.queries.categories
        
        if(queryCategories.includes(category)){
            queryCategories = queryCategories.filter(c=>(c != category))
        }else{
            queryCategories.push(category)
        }
        
        state.setCategories(queryCategories)
    }

    const clearList = () =>{
        state.setCategories([])
    }
    useEffect(()=>{
        if(categories.length == 0 ){
            setLoading(true)
            listPrimariesService(false)
            .then( categories => setCategories(categories))
            .catch(()=>{})
            .finally(()=>setLoading(false))
        }
    },[])
    return (
        <div className="search-selector">
            <span className="search-selector-title"> Categorias </span>
           { loading ? "loading" :
            <nav>

                <ul>
                    <li onClick={()=>clearList()} className={state.queries.categories.length ===0 ? 'search-selector-selected' : ''} >
                        <input readOnly type="checkbox" checked={state.queries.categories.length ===0 }></input>Todas Categorias
                    </li>
                    {categories.map((c,i)=>(
                        <li key={i} onClick={()=>toggleToTheList(c)} 
                        className={state.queries.categories.includes(c) ? 'search-selector-selected' : ''} >
                        <input readOnly type="checkbox" checked={state.queries.categories.includes(c)}></input>
                             {c.name}
                        </li>
                    ))}
                </ul>
            </nav>
            }
        </div>
    )
}