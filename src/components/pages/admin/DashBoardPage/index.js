import './style.css'
import { getMetrics } from '../../../../services/utils-service'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMetrics } from '../../../../store/reducers/admins/actions'
import LoadingCompfrom from '../../../utils/LoadingComp'
import LoadingComp from '../../../utils/LoadingComp'
import TotalTable from './TotalTable'
import React from 'react'
import LatestEntitiesFlow from './LatestEntitiesFlow'

import { AiFillShop } from 'react-icons/ai'
import { BiPackage} from 'react-icons/bi'
import { FaTruck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import { Link } from 'react-router-dom'

export default () =>{
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    const { metrics } = useSelector(state => state.admins)
    useEffect(()=>{
        if(!metrics){
            setLoading(true)
            getMetrics()
            .then((data)=>dispatch(setMetrics(data)))
            .catch(err=> console.log(err.message))
            .finally(()=> setLoading(false))
        }
    },[])
    return (<div id="admin-dash-board">

        {
            loading? <LoadingComp></LoadingComp> :

            metrics &&  (<React.Fragment>

                <TotalTable { ...metrics}></TotalTable>

                <div className="latest-entities-grid">


                    <LatestEntitiesFlow 
                        title={'Últimos Clientes'} 
                        icon={<AiFillShop></AiFillShop>}
                        list={metrics.lastMarts}
                        innerComp={ ({id, name}) =><Link to={`/admins/marts/update?id=${id}`}>{name}</Link>}>
                    </LatestEntitiesFlow>

                    <LatestEntitiesFlow 
                        title={'Últimos Pedidos'} 
                        icon={<CgNotes></CgNotes>}
                        list={metrics.lastOrders}
                        innerComp={ ({product, mart, quantity}) =>
                        (   
                            <div className="order-latest-item">

                                <span> {quantity}x - {product.label} </span>
                                <span> por {mart.label} </span>

                            </div>
                            
                        )
                        
                        }>
                    </LatestEntitiesFlow>
                </div>

            </React.Fragment>)

        }

    </div>)
}