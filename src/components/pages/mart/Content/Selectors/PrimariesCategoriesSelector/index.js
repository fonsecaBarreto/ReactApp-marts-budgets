import React, { useEffect, useState } from 'react'
import '../style.css'

import { listPrimariesService } from '../../../../../../services/mart-product-search-service'
import { AiFillTags } from 'react-icons/ai'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

export default ({ state }) =>{

    const [ showOnMobile, setShowOnMobile ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ categories, setCategories ] = useState([])

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

    const search = () => {
        state.loadFeed(0, false)
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
            <span className="search-selector-title"> <AiFillTags></AiFillTags> Categorias </span>
           { loading ? "loading" :
           <React.Fragment>
                <button className="soft-btn  mobile-only" onClick={()=>setShowOnMobile(!showOnMobile)}> 

                    <span>   { !showOnMobile ? <MdExpandMore></MdExpandMore> : <MdExpandLess></MdExpandLess> } Selecionar </span>
           

                </button>
                <nav className={`${showOnMobile ? '' : 'hide-onMobile'}`}>

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
            </React.Fragment>
            }
            <button className="soft-btn desktop-only" onClick={search}>Aplicar</button>
        </div>

    )
}