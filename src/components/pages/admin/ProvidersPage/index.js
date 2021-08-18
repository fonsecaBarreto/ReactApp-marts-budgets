import React, { useEffect, useState, useRef, useCallback } from "react"
import { withRouter } from "react-router-dom"
import './style.css'
import { listProvidersWithFilterService } from '../../../../services/provider-service'
import ProviderItem from './Item'
import ResulInfo from '../../../utils/Feed/ResulInfo'
import AppFeed, { FeedState } from '../../../utils/Feed'
import SearchBar from '../../../utils/Feed/SearchBar'
import { RiFileExcel2Line } from 'react-icons/ri'

import { downloadXls } from '../../../../services/utils-service'

import TopWrapperGrid from '../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'
import BottomWrapperGrid from '../../../layouts/Admin/common/ListPageWrapper/BottomWrapperGrid'
export default withRouter(({history}) =>{

    const feedState = FeedState(listProvidersWithFilterService, {text:""})
    const { feed, setFeed, loadFeed } = feedState

    const handleText = (value) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: value } } )) 
    }

    const add = () =>{ history.push('/admins/providers/create')  }



    

    return (
        <div id="admin-provider-page">

                <TopWrapperGrid>
                    <SearchBar 
                        onAdd={add}
                        label="Pesquise por Nome, Telefone ou E-mail " 
                        toSearch={()=> loadFeed(0, false)} 
                        text={feed.queries.text}
                        onText={handleText}> 
                    </SearchBar>
                </TopWrapperGrid>

                <AppFeed state={feedState} component={ProviderItem}> </AppFeed> 

                <BottomWrapperGrid>  
                    <section className="app-padding">
                        <ResulInfo total={ feedState.feed.total } count={feedState.feed.data.length} subTotal={feedState.feed.subTotal} > </ResulInfo>
                        <a href={downloadXls('providers')} className="soft-btn opt-btn"> <RiFileExcel2Line></RiFileExcel2Line> Download  </a>
                    </section>
                </BottomWrapperGrid>
     
         
        </div>
    )
})