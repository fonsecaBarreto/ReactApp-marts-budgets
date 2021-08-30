import React, { useEffect } from "react"
import './style.css'
import ProductFeed, { FeedState } from "./ProductFeed"
import ToolBar from  './ToolBar'
import PrimariesCategoriesSelector from "./Selectors/PrimariesCategoriesSelector"
import BrandsSelector from "./Selectors/BrandsSelector" 
import { useHistory } from 'react-router-dom'
export default ({onItem}) =>{
    const history = useHistory()
    const state = FeedState()

   
    useEffect(()=>{
        let isMounted = true;    
        state.clearQueries()
        return () => {
             isMounted = false 
        }; 
    },[])

    return (

        <div className="budget-page-search-content">
            
            <div className="filtering-column ">
                <PrimariesCategoriesSelector state={state}></PrimariesCategoriesSelector>
                <BrandsSelector state={state}></BrandsSelector> 
              
            </div>

            <div className="main-column">
                <ToolBar state={state}></ToolBar> 
                <ProductFeed state={state} onItem={onItem}></ProductFeed> 
            </div> 

        </div> 
    )

}