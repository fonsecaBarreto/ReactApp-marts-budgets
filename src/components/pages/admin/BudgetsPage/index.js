import { useState } from 'react'
import './style.css'
import { listOrders } from '../../../../services/order-service'
import SearchToolBar, { ToolBarState } from './SearchToolBar'
import BudgetsFlow from './BudgetsFlow'
import LoadingComp from '../../../utils/LoadingComp'
import AdminMaxWrapper from '../../../layouts/Admin/common/AdminMaxWrapper'
import DarkFlexRow from '../../../layouts/Admin/common/AdminMaxWrapper/includes/DarkFlexRow'

import { RiFileExcel2Line } from 'react-icons/ri'
import { downloadXls } from '../../../../services/utils-service'

const INITIAL_DATA = {
    total: 0, // total of orders on system
    ordersTotal: 0,// total of orders on search,
    groups: []
}

export const BudgetState = () =>{
    const [ data, setData ] = useState(INITIAL_DATA)
    return { data, setData }
}

export default () =>{

    const [ loading, setLoading ] = useState()
    const toolBarState = ToolBarState()
    const { data, setData } = BudgetState()

    const loadProduct = async () =>{
        setLoading(true)
        try{
            const result = await listOrders(toolBarState.queriesState.queries)
            setData(result)
        }catch(err){ console.log(err.message) }
        setLoading(false)
    }

    useState(()=>{
        loadProduct()
    },[])

    return (<AdminMaxWrapper>
        <SearchToolBar {...toolBarState} toSearch={loadProduct}> </SearchToolBar>
        {
            loading ? <LoadingComp></LoadingComp>:
            <BudgetsFlow ordersgroups={data.groups}></BudgetsFlow>  
        } 
        <DarkFlexRow>
            <a href={downloadXls('orders')}>  <RiFileExcel2Line></RiFileExcel2Line>  Download  </a>
        </DarkFlexRow>
    </AdminMaxWrapper>)
}