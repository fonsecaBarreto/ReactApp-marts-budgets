import React from 'react'
import './style.css'
import AppFeed, { FeedState } from '../../../utils/Feed'
import ResulInfo from '../../../utils/Feed/ResulInfo'
import SearchBar from '../../../utils/Feed/SearchBar'

import { listItemsWithFilterService } from '../../../../services/item-service'
import ProductItem from './Item'
import { withRouter } from 'react-router-dom'

import { RiFileExcel2Line } from 'react-icons/ri'
import AdminToolBarGrid from "../../../utils/Admin-tool-bar-grid"
import { downloadXls } from '../../../../services/utils-service'
import TopWrapperGrid from '../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'
import BottomWrapperGrid from '../../../layouts/Admin/common/ListPageWrapper/BottomWrapperGrid'

import { ListProductView } from './ProductListView'

const LABELS = {
    index:"",
    product: {
        description:"Especificação:",
        brand :{ label: "Marca:"},
        presentation: "Apresentação: "
    }
}

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

            <TopWrapperGrid>
                    <SearchBar  onAdd={add}  label="Pesquisar pelo nome do Item"  text={feed.queries.text}  onText={handleText} toSearch={()=> loadFeed(0, false)} > 
                    </SearchBar>
            </TopWrapperGrid>

          
            <AppFeed state={feedState} component={ProductItem}>  </AppFeed>

            <BottomWrapperGrid>  

                <section className="app-padding">
                    <ListProductView className="headerlike app-padding " product={LABELS} {...LABELS}></ListProductView>
                </section  >
                
                <section className="app-padding">
                    <ResulInfo total={ feedState.feed.total } count={feedState.feed.data.length} subTotal={feedState.feed.subTotal} > </ResulInfo>
                    <a href={downloadXls('products')}>  <RiFileExcel2Line></RiFileExcel2Line>  Download  </a>
                </section>

            </BottomWrapperGrid>
          
        </div>)
})