import { useEffect, useState } from "react"
import './style.css'
import { listMartsService } from '../../../../services/mart-service'
import MartItem from './Item'
import ControlBar from "./ControlBar"



const INITIAL_FILTERS = {
    text: "",
}

export const MartsState = () =>{

    const [ filters, setFilters ] = useState(INITIAL_FILTERS)
    const [ marts, setMarts ] = useState([])
    const [ loading, setLoading ] = useState(true)
    useEffect(()=>{
        setLoading(true)
        if(marts.length === 0 ){
            listMartsService()
            .then(marts=>setMarts(marts))
            .catch(err=>console.log(err))
            .finally(()=>setLoading(false))
        }
    },[ ])

    return { marts, filters, setFilters, loading }
}


export default () =>{

    const state = MartsState()
    const { filters, setFilters, loading } = state

    const filterMarts = (martsList) =>{
 
        const { text } = filters
        var marts = [ ...martsList ]

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


    const { marts } = state
    return (
        <div id="admin-marts-page">

            <div className="app-container">

                <ControlBar filters={filters} setFilters={setFilters} onAdd={()=>alert("Redirecionar para cadasto")}></ControlBar>

                <div className={` admin-marts-flow ${`${loading ? 'loading' : ''}`}`}>
                    {
                        marts.length > 0 && filterMarts(marts).map((m,i)=>{
                            return(
                                <MartItem key={i} mart={m}></MartItem>
                                )
                            })
                        }
                
                </div>
            </div>
       
        </div>
    )
}