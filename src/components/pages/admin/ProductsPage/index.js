import React from 'react'
import './style.css'
import AppFeed, { FeedState } from '../../../utils/Feed'
import SearchBar from '../../../utils/Feed/SearchBar'

import { listProvidersWithFilterService } from '../../../../services/provider-service'


const Compo = ({data}) => {
    const { name } = data
    return (
        <span style={{height: 60}}> { name} </span>
    )
}

export default () =>{   
    const feedState = FeedState(listProvidersWithFilterService)
    const { feed, setFeed, loadFeed } = feedState

    const handleText = (value) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: value } } )) 
    }

    return (
        <div id="admin-dash-board">
            <div className="app-container">

                <SearchBar 
                    label="Nome, Telefone ou E-mail " 
                    toSearch={()=> loadFeed(0, false)} 
                    text={feed.queries.text}
                    onText={handleText}> 
                </SearchBar>

                <AppFeed state={feedState} component={Compo}> </AppFeed>
            </div>
        </div>)
}