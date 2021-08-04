import React, { useEffect, useState } from 'react'
import '../style.css'
import './style.css'

import { listPrimariesService, MartslistCategoriesWithFilter } from '../../../../../services/mart-product-search-service'
import AppSelector from '../../../../utils/AppSelector'

export default ({state}) =>{

    const [ loading, setLoading ] = useState(false)
    const [ categories, setCategories ] = useState([])

    const handleInput = (result) => {
      /*   state.setCategories([result.value])
        setvalue(result) */
    }

    const toggleToTheList = (id) =>{
        var queryCategories = state.queries.categories
        
        if(queryCategories.includes(id)){
            queryCategories = queryCategories.filter(c=>(c != id))
        }else{
            queryCategories.push(id)
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

              {/*   <AppSelector
                    loadFunction={MartslistCategoriesWithFilter} onInput={handleInput}
                    serializeTo={{ label:"name", value: "id" }} // transform date coming from loadfunction intro label and value
                ></AppSelector> */}

                <ul>
                    <li onClick={()=>clearList()} className={state.queries.categories.length ===0 ? 'search-selector-selected' : ''} > Todos Categorias </li>
                    {categories.map((c,i)=>(
                        <li key={i} onClick={()=>toggleToTheList(c.id)} className={state.queries.categories.includes(c.id) ? 'search-selector-selected' : ''} > {c.name} </li>
                    ))}
                </ul>
            </nav>
            }
        </div>
    )
}