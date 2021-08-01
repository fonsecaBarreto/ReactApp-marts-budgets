import { useEffect, useState } from "react"
import './style.css'
import ItemDialogView from './ItemDialogView'
import { withRouter } from "react-router-dom"
import React from "react"

import AppFeed, { FeedState } from '../../../utils/Feed'
import SearchBar from '../../../utils/Feed/SearchBar'
import { listMartsWithFilterService } from '../../../../services/mart-service'
import MartItem from './Item'

export default withRouter(({history}) =>{

    const [ currentMart, setCurrentMart ] = useState(null)

    const feedState = FeedState(listMartsWithFilterService,{ text:"", status:0 })
    const { feed, setFeed, loadFeed, setQueries } = feedState



    const updateMart = (mart) =>{
        /*   console.log("autlaizado?", mart)
          const less = marts.filter(m =>(m.id !== mart.id))
          setMarts([mart, ...less]) */
    } 

    const handleText = (value) =>{
        setFeed(prev=> ( { ...prev, queries : { ...prev.queries, text: value } } )) 
    }
    const handleChange = e => {
        setQueries({status: e.target.value})
  /*       setFeed(prev=>({ ...prev, queries: { ...prev.queires, status: e.target.value} })) */
        /* setFilters( prev => ({...prev, status: Number(e.target.value) })) */
    };


    const add = () =>{ history.push('/admins/marts/create')  }

    return (
        <div id="admin-marts-page">

            <div className="app-container">
                <SearchBar 
                    onAdd={add}
                    label="Nome, Telefone ou E-mail " 
                    toSearch={()=> loadFeed(0, false)} 
                    text={feed.queries.text}
                    onText={handleText}> 

                    <select className="status-select-box" onChange={handleChange} value={feed.queries.status || 0}  >
                        <option value={2}> Pendentes</option>
                        <option value={1}> Ativos</option>
                        <option value={0}> Todos </option>
                    </select>
                </SearchBar>
             
                <AppFeed state={feedState} component={MartItem}> </AppFeed> 
     
            </div>

           {/*  { currentMart && <ItemDialogView 
                mart={currentMart}
                setMart ={setCurrentMart}
                updateMart={updateMart}
                ></ItemDialogView>} */}
       
        </div>
    )
})