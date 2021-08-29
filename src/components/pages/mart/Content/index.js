import React, { useEffect } from "react"
import './style.css'
import ProductFeed, { FeedState } from "./ProductFeed"
import SearchBar from  './SearchBar'
import PrimariesCategoriesSelector from "./Selectors/PrimariesCategoriesSelector"
import BrandsSelector from "./Selectors/BrandsSelector" 
import { useHistory } from 'react-router-dom'
export default ({onItem}) =>{
    const history = useHistory()
    const state = FeedState()

    const goto = () =>{
        history.push("/marts/sugestao")
    }

    
    useEffect(()=>{
        let isMounted = true;    
        state.clearQueries()
        return () => {
             isMounted = false 
        }; 
       
    },[])


    return (

        <div className="budget-page-search-content budget-page-container app-container">
            
            <div className="filtering-column ">

                <PrimariesCategoriesSelector state={state}></PrimariesCategoriesSelector>
                <BrandsSelector state={state}></BrandsSelector> 

                <button className="desktop-only suggestions-button soft-btn" onClick={goto}> Sugestões ? </button>
            </div>

            <div className="main-column">
          
                <SearchBar state={state}></SearchBar> 
             
                <ProductFeed state={state} onItem={onItem}></ProductFeed> 
            </div> 

        </div> 
    )

}