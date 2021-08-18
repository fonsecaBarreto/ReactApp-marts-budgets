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
export default withRouter(({history}) =>{

    const [ currentMart, setCurrentMart ] = useState(null)

    const feedState = FeedState(listMartsWithFilterService,{ text:"", status:0 })
    const { feed, setFeed, loadFeed, setQueries } = feedState

    const updateMart = (mart) =>{
          loadFeed(0,false)
    } 

    const handleText = (value) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: value } } )) 
    }
    const handleChange = e => {
        setQueries({status: e.target.value})

    };

    const openModal = (a) =>{
        if(a?.key && a.key === "open"){
            setCurrentMart(a.data)
        }
    }


    const add = () =>{ history.push('/admins/marts/create')  }

    return (
        <div id="admin-marts-page">


            <TopWrapperGrid>
                <SearchBar 
                    onAdd={add}
                    label="Pesquise pelo Nome, Telefone ou E-mail " 
                    toSearch={()=> loadFeed(0, false)} 
                    text={feed.queries.text}
                    onText={handleText}> 

                     <select className="status-select-box" onChange={handleChange} value={feed.queries.status || 0}  >
                        <option value={2}> Pendentes</option>
                        <option value={1}> Ativos</option>
                        <option value={0}> Todos </option>
                    </select> 
                </SearchBar>
            </TopWrapperGrid>

            <AppFeed className="app-container" state={feedState} component={MartItem} onClick={openModal}> </AppFeed> 
     
            <BottomWrapperGrid>  

                <section className="app-padding">
                    <ResulInfo total={ feedState.feed.total } count={feedState.feed.data.length} subTotal={feedState.feed.subTotal} > </ResulInfo>
                    <a href={downloadXls('marts')}>  <RiFileExcel2Line></RiFileExcel2Line>  Download  </a>
                </section>

            </BottomWrapperGrid>

           { currentMart && <ItemDialogView 
                mart={currentMart}
                setMart ={setCurrentMart}
                updateMart={updateMart}
                ></ItemDialogView>} 
       
        </div>
    )
})