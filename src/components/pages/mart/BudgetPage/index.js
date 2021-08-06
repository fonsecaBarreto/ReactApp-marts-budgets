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
            <div className="budget-page-search-content app-container">
       
                <div className="filtering-column ">
                    <PrimariesCategoriesFlow state={state}></PrimariesCategoriesFlow>
                </div>

                {/* <div>
                    <SearchBar state={state}></SearchBar>
                    <ProductFeed state={state}></ProductFeed>
                </div>  */}

            </div>
          
        </div>
    )
})
{/*   <BrandsSelector state={state}></BrandsSelector> */}