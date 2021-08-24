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


import MxWrapper from '../../../layouts/Admin/common/AdminMaxWrapper'

import DarkFlexRowfrom from '../../../layouts/Admin/common/AdminMaxWrapper/includes/DarkFlexRow'
export default withRouter(({history}) =>{

    const feedState = FeedState(listProvidersWithFilterService, {text:""})
    const { feed, setFeed, loadFeed, queries, handleQueries } = feedState

    const handleText = (value) =>{
        handleQueries('text',value)
    }

    const add = () =>{ history.push('/admins/providers/create')  }



    

    return (
        <MxWrapper>

             
                <SearchBar 
                    onAdd={add}
                    label="Pesquise por Nome, Telefone ou E-mail " 
                    toSearch={()=> loadFeed(0, false)} 
                    text={queries.text}
                    onText={handleText}> 
                </SearchBar>
       

                <AppFeed state={feedState} component={ProviderItem}> </AppFeed> 

                <DarkFlexRowfrom>  
                
                    <ResulInfo total={ feedState.feed.total } count={feedState.feed.data.length} subTotal={feedState.feed.subTotal} > </ResulInfo>
                    <a href={downloadXls('providers')} className="soft-btn opt-btn"> <RiFileExcel2Line></RiFileExcel2Line> Download  </a>
            
                </DarkFlexRowfrom>
     
         
        </MxWrapper>
    )
})