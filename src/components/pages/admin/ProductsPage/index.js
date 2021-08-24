import React, { useState } from 'react'
import './style.css'
import AppFeed, { FeedState } from '../../../utils/Feed'
import ResulInfo from '../../../utils/Feed/ResulInfo'

import { listItemsWithFilterService } from '../../../../services/item-service'
import ProductItem from './Item'
import { withRouter } from 'react-router-dom'
import { downloadXls } from '../../../../services/utils-service'
import { RiFileExcel2Line } from 'react-icons/ri'

import MxWrapper from '../../../layouts/Admin/common/AdminMaxWrapper'
import BrandSelector from './Filters/BrandSelector'
import SearchBar from './Filters/SearchBar'
import AltFormRow from '../../../utils/AltFormRow'

import DarkFlexRowfrom from '../../../layouts/Admin/common/AdminMaxWrapper/includes/DarkFlexRow'
const LABELS = {
    index:"",
    product: {
        description:"Especificação:",
        brand :{ label: "Marca:"},
        presentation: "Apresentação: "
    }
}
const INITIAL_QUERIES = {
    item: "",
    product: "",
    brands: [ { label: "", value: ""}],
}

export default withRouter(({history}) =>{  

    
    const feedState = FeedState(listItemsWithFilterService, {...INITIAL_QUERIES})
    const {queries, handleQueries} = feedState
    const add = () =>{
        return history.push('/admins/items/create')
    } 


    return (
         <MxWrapper>
                      
            <div className="product-filter-grid">
                <SearchBar label={'Procurar por item'} value={queries.item} inputHandler={(e)=>handleQueries('item',e.target.value)}
                    toSearch={() => feedState.loadFeed(0,false)}></SearchBar>
                <SearchBar label={"Procurar por produto"} value={queries.product} inputHandler={(e)=>handleQueries('product',e.target.value)}
                    toSearch={() => feedState.loadFeed(0,false)}></SearchBar>
                <BrandSelector disabled={queries.product.length == 0 } value={queries.brands[0]} inputHandler={handleQueries} toSearch={() => feedState.loadFeed(0,false)}></BrandSelector>
                <AltFormRow label="">
                    <button className="soft-btn" onClick={()=>feedState.loadFeed(0,false)}> Buscar</button>
                </AltFormRow>
            </div>

            <AppFeed 
                state={feedState}
                component={ProductItem}
            ></AppFeed>

            <DarkFlexRowfrom>
                <ResulInfo total={ feedState.feed.total } count={feedState.feed.data.length} subTotal={feedState.feed.subTotal} > </ResulInfo>
                <a href={downloadXls('products')}>  <RiFileExcel2Line></RiFileExcel2Line>  Download  </a> 
            </DarkFlexRowfrom>

        </MxWrapper>  
    )
})
