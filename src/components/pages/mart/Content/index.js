import React from "react"
import './style.css'
import ProductFeed, { FeedState } from "./ProductFeed"
import SearchBar from  './SearchBar'
import PrimariesCategoriesSelector from "./Selectors/PrimariesCategoriesSelector"
import BrandsSelector from "./Selectors/BrandsSelector" 

export default ({onItem}) =>{

    const state = FeedState()

    return (

        <div className="budget-page-search-content budget-page-container app-container">
       
            <div className="filtering-column ">
                <PrimariesCategoriesSelector state={state}></PrimariesCategoriesSelector>
                <BrandsSelector state={state}></BrandsSelector> 
            </div>

            <div className="main-column">
                <SearchBar state={state}></SearchBar> 
                <ProductFeed state={state} onItem={onItem}></ProductFeed> 
            </div> 

        </div> 
    )

}