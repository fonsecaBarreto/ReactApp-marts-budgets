import React from 'react'
import './style.css'
import AppFeed, { FeedState } from '../../../utils/Feed'
import SearchBar from '../../../utils/Feed/SearchBar'

import { listItemsWithFilterService } from '../../../../services/item-service'
import ProductItem from './Item'
import { withRouter } from 'react-router-dom'

export default withRouter(({history}) =>{   
    
    const feedState = FeedState(listItemsWithFilterService, { text: "" })
    const { feed, setFeed, loadFeed } = feedState

    const handleText = (value) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: value } } )) 
    }
    const add = () =>{
        return history.push('/admins/items/create')
    }

    return (
        <div id="admin-products-page" >
            <div className="app-container">

                <SearchBar 
                    onAdd={add}
                    label="Nome do Item" 
                    toSearch={()=> loadFeed(0, false)} 
                    text={feed.queries.text}
                    onText={handleText}> 
                </SearchBar>

                <AppFeed state={feedState} component={ProductItem}> 
                {/* 
                    <div className="listing-grid">
                        <span>Especificação </span>
                        <span>Marca </span>
                        <span>Apresentação </span>
                    </div> */}
                </AppFeed>
            </div>
        </div>)
})