import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import './style.css'

import { listProvidersService } from '../../../../services/provider-service'
import AdminCommonToolBar from "../../../layouts/Admin/AdminCommonToolBar"
import LoadingComp from "../../../utils/LoadingComp"
import ProviderItem from './Item'
export const ProviderState = () =>{

    const [ providers, setProviders ] = useState([])
    const [ loading, setLoading ] = useState(false)

    useEffect(()=>{
        setLoading(true)
        if(providers.length === 0 ){
            listProvidersService()
            .then(providers=>setProviders(providers))
            .catch(err=>{})
            .finally(()=>setLoading(false))
        }
    },[ ])

    return { providers, loading }
}


export default withRouter(({history}) =>{

    const state = ProviderState()
    const { loading, providers } = state

    const add = () =>{
       history.push('/admins/providers/create') 
    }

    const edit = (id) =>{
        history.push(`/admins/providers/update?pd=${id}`) 
    }
 

    return (
        <div id="admin-provider-page">
            <div className="app-container">
                <AdminCommonToolBar>
                    <button onClick={add}> 
                        Novo
                    </button> 
                </AdminCommonToolBar>
                
                { loading  ? <LoadingComp></LoadingComp> :
                    <div className={`admin-providers-flow`}>
                        {
                            providers.map((p,i)=>( 
                                <ProviderItem key={i} provider={p} onEdit={edit}></ProviderItem> ))
                        }
                    </div>
                }
            </div>
        </div>
    )
})