import React from "react"
import './style.css'
import { withRouter } from 'react-router-dom'
import ProductFeed, { FeedState } from "../ProductFeed"
import PrimariesCategoriesSelector from "../Selectors/PrimariesCategoriesSelector"
import BrandsSelector from "../Selectors/BrandsSelector"
import SearchBar from  '../SearchBar'

export default withRouter(({history}) =>{

    const state = FeedState()
    return (
        <div id="budget-page">


            <div className="budget-page-search-content budget-page-container">
       
                <SearchBar state={state}></SearchBar>
                 
                <div className="filtering-column ">
                    <PrimariesCategoriesSelector state={state}></PrimariesCategoriesSelector>
                    <BrandsSelector state={state}></BrandsSelector>
                </div>
                <div>
                   
                    <ProductFeed state={state}></ProductFeed> 
                </div> 

            </div>
          
        </div>
    )
})
{/*   <BrandsSelector state={state}></BrandsSelector> */}