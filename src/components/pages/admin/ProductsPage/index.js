import React from 'react'
import './style.css'
import AppFeed, { FeedState } from '../../../utils/Feed'
import SearchBar from '../../../utils/Feed/SearchBar'

import { listProductsWithFilterService } from '../../../../services/products-service'
import ProductItem from './Item'
import { withRouter } from 'react-router-dom'

export default withRouter(({history}) =>{   
    
    const feedState = FeedState(listProductsWithFilterService, {text: "", category_id: ""})
    const { feed, setFeed, loadFeed } = feedState

    const handleText = (value) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: value } } )) 
    }
    const add = () =>{
        return history.push('/admins/products/create')
    }

    return (
        <div id="admin-products-page" >
            <div className="app-container">

                <SearchBar 
                    onAdd={add}
                    label=" Procure o produto aqui " 
                    toSearch={()=> loadFeed(0, false)} 
                    text={feed.queries.text}
                    onText={handleText}> 
                </SearchBar>

                <AppFeed state={feedState} component={ProductItem}> </AppFeed>
            </div>
        </div>)
})