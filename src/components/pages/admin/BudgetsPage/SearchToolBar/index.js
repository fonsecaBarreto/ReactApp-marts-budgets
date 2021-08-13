import React, { useState } from "react"
import './style.css'

import { withRouter } from  'react-router-dom'

import ProductNameSearch from "./ProductNameSearch"
import BrandSelector from "./BrandSelector"
import ForecastPicker from "./ForecastPicker"
const INITIAL_QUERIES = {
    brands: [{label: "", value: ""}],
    product_name: "" ,
    forecast: ""
}

export const ToolBarState = () =>{
    const [ queries, setQueries ] = useState(INITIAL_QUERIES)

    const setProductName = (value) => setQueries(prev => ({...prev, product_name: value }))
    const setForecast= (value) => setQueries(prev => ({...prev, forecast: value }))
    const setBrands= (value) => setQueries(prev => ({...prev, brands: value }))

    return { queriesState: { 
            queries, 
            setQueries,
            setProductName,
            setForecast,
            setBrands
    }}
}

export default withRouter( ({ queriesState, toSearch  }) => {

 
    return (
        <div className="admin-ku-search-tool-bar">

            <div className={`akustb-grid`}>

                <ProductNameSearch queriesState={queriesState} toSearch={toSearch} ></ProductNameSearch>
                <ForecastPicker  queriesState={queriesState} toSearch={toSearch} ></ForecastPicker>
                <BrandSelector queriesState={queriesState} toSearch={toSearch} ></BrandSelector>
                
          {/*       <input className="aftb-search-bar" onKeyDown={handleKeyDown} style={{paddingLeft: 10}} value={text} onInput={handleInput} placeholder={label || ''}></input> 
                { children && children} */}


            </div>
        </div>
    )
})