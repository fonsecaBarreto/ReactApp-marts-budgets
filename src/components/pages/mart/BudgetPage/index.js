import React from "react"
import './style.css'
import { withRouter } from 'react-router-dom'
import ProductFeed, { FeedState } from "../ProductFeed"
import PrimariesCategoriesFlow from "../Selectors/PrimariesCategoriesSelector"
import BrandsSelector from "../Selectors/BrandsSelector"
import SearchBar from  '../SearchBar'

export default withRouter(({history}) =>{

    const state = FeedState()
    return (
        <div id="budget-page">
            ORÇAMENTO ONLINE
       
            <div className="budget-page-search-content">
       
                <div className="filtering-column ">
                    <PrimariesCategoriesFlow state={state}></PrimariesCategoriesFlow>
                    <BrandsSelector state={state}></BrandsSelector>
                </div>

                <div>
                    <SearchBar state={state}></SearchBar>
                    <ProductFeed state={state}></ProductFeed>
                </div>

            </div>
          
        </div>
    )
})