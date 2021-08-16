import React, { useEffect, useState, useRef, useCallback } from "react"
import { withRouter } from "react-router-dom"
import './style.css'
import { listProvidersWithFilterService } from '../../../../services/provider-service'
import ProviderItem from './Item'
import { AiOutlinePlus } from 'react-icons/ai'
import AppFeed, { FeedState } from '../../../utils/Feed'
import SearchBar from '../../../utils/Feed/SearchBar'
import { RiFileExcel2Line } from 'react-icons/ri'
import AdminToolBarGrid from "../../../utils/Admin-tool-bar-grid"
import { downloadXls } from '../../../../services/utils-service'
export default withRouter(({history}) =>{

    const feedState = FeedState(listProvidersWithFilterService, {text:""})
    const { feed, setFeed, loadFeed } = feedState

    const handleText = (value) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: value } } )) 
    }

    const add = () =>{ history.push('/admins/providers/create')  }



    

    return (
        <div id="admin-provider-page">
            <div className="app-container">
                <AdminToolBarGrid>

                    <SearchBar 
                        onAdd={add}
                        label="Nome, Telefone ou E-mail " 
                        toSearch={()=> loadFeed(0, false)} 
                        text={feed.queries.text}
                        onText={handleText}> 
                    </SearchBar>
                    <a href={downloadXls('providers')} className="soft-btn opt-btn">
                     
                        <RiFileExcel2Line></RiFileExcel2Line>
                        Download
                   
                    </a>
             
                </AdminToolBarGrid>

             
                <AppFeed state={feedState} component={ProviderItem}> </AppFeed> 
     
            </div>
        </div>
    )
})