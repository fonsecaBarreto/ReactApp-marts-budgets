import { useEffect, useState } from "react"
import './style.css'
import ItemDialogView from './ItemDialogView'
import { withRouter } from "react-router-dom"
import React from "react"

import AppFeed, { FeedState } from '../../../utils/Feed'
import ResulInfo from '../../../utils/Feed/ResulInfo'
import SearchBar from '../../../utils/Feed/SearchBar'
import { listMartsWithFilterService } from '../../../../services/mart-service'
import MartItem from './Item'


import { RiFileExcel2Line } from 'react-icons/ri'
import { downloadXls } from '../../../../services/utils-service'
import TopWrapperGrid from '../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'
import BottomWrapperGrid from '../../../layouts/Admin/common/ListPageWrapper/BottomWrapperGrid'

import MxWrapper from '../../../layouts/Admin/common/AdminMaxWrapper'

import DarkFlexRowfrom from '../../../layouts/Admin/common/AdminMaxWrapper/includes/DarkFlexRow'

export default withRouter(({history}) =>{

    const [ currentMart, setCurrentMart ] = useState(null)

    const feedState = FeedState(listMartsWithFilterService,{ text:"", status:0 })

    const { feed, queries, setFeed, loadFeed, handleQueries } = feedState

    const updateMart = (mart) =>{
          loadFeed(0,false)
    } 

    const handleText = (value) =>{
        handleQueries('text', value)
    }
    const handleChange = e => {
        handleQueries('status', e.target.value)
    };

    const openModal = (a) =>{
        console.log(a)
        if(a?.key && a.key === "open"){
            setCurrentMart(a.data)
        }
    }


    const add = () =>{ history.push('/admins/marts/create')  }

    return (
        <React.Fragment>

        <MxWrapper>
            <SearchBar 
                onAdd={add}
                label="Pesquise pelo Nome, Telefone ou E-mail " 
                toSearch={()=> loadFeed(0, false)} 
                text={queries.text}
                onText={handleText}> 
                <select className="status-select-box" onChange={handleChange} value={queries.status || 0}  >
                    <option value={2}> Pendentes</option> <option value={1}> Ativos</option> <option value={0}> Todos </option>
                </select> 
            </SearchBar>
          

            <AppFeed className="app-container" state={feedState} component={MartItem} onClick={openModal}> </AppFeed> 
     
            <DarkFlexRowfrom>  
                <ResulInfo total={ feedState.feed.total } subTotal={feedState.feed.subTotal} > </ResulInfo>
                <a href={downloadXls('marts')}>  <RiFileExcel2Line></RiFileExcel2Line>  Download  </a>
            </DarkFlexRowfrom>
        </MxWrapper>

           { currentMart && <ItemDialogView 
                mart={currentMart}
                setMart ={setCurrentMart}
                updateMart={updateMart}
                ></ItemDialogView>} 

       
        </React.Fragment>
    )
})