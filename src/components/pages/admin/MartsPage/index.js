import { useEffect, useState } from "react"
import './style.css'
import { listMartsService } from '../../../../services/mart-service'
import MartItem from './Item'
import ControlBar from "./ControlBar"
import ItemDialogView from './ItemDialogView'
import AdminCommonToolBar from "../../../layouts/Admin/AdminCommonToolBar"
import { withRouter } from "react-router-dom"
import React from "react"
import LoadingComp from "../../../utils/LoadingComp"
const INITIAL_FILTERS = {
    text: "",
    status: 0
}

export const MartsState = () =>{

    const [ filters, setFilters ] = useState(INITIAL_FILTERS)
    const [ marts, setMarts ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const updateMart = (mart) =>{
        console.log("autlaizado?", mart)
        const less = marts.filter(m =>(m.id !== mart.id))
        setMarts([mart, ...less])
    }   

    useEffect(()=>{
        setLoading(true)
        if(marts.length === 0 ){
            listMartsService()
            .then(marts=>setMarts(marts))
            .catch(err=>console.log(err))
            .finally(()=>setLoading(false))
        }
    },[ ])

    return { marts, filters, setFilters, loading, updateMart }
}


export default withRouter(({history}) =>{

    const [ currentMart, setCurrentMart ] = useState(null)
    const state = MartsState()
    const { filters, setFilters, loading, updateMart } = state


    const filterMarts = (martsList) =>{
 
        const { text, status } = filters
        var marts = [ ...martsList ]


        switch (status) {
            case 1: marts = marts.filter(m=>(m.isActive === true)); break;
            case 2 :marts = marts.filter(m=>(m.isActive === false)); break;
            default : marts = marts
        }

        if( text !== ""  ) marts = marts.filter(n=>{
            const text_filter = text.toLowerCase()
            const { email, phone, name } = n
            let companyName  = name.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "");
            if( companyName.includes( text_filter )) return n
            if( (email).toLowerCase().includes( text_filter ) ) return n
            if( (phone).includes( text_filter ) ) return n
        }) ;

        return marts
    }

    const add = () =>{
       history.push('/admins/marts/create') 
    }

    const { marts } = state
    return (
        <div id="admin-marts-page">

                <div className="app-container">
                    <AdminCommonToolBar>
                        <button onClick={add}> 
                            Novo
                        </button> 
                    </AdminCommonToolBar>

                    <ControlBar filters={filters} setFilters={setFilters} ></ControlBar>

                    { loading  ? <LoadingComp></LoadingComp> :
                        <div className={` admin-marts-flow `}>
                            {
                                marts.length > 0 && filterMarts(marts).map((m,i)=>{
                                    return( <MartItem key={i} mart={m} onView={()=>setCurrentMart(m)}></MartItem>)
                                })
                            }
                        </div>
                    }
                    
                </div>

                { currentMart && <ItemDialogView 
                    mart={currentMart}
                    setMart ={setCurrentMart}
                    updateMart={updateMart}
                    ></ItemDialogView>}
       
        </div>
    )
})