import { useSelector, useDispatch } from 'react-redux'
import './style.css'
import { useEffect, useState } from 'react'

import MaxWrapper from '../../../layouts/Admin/common/AdminMaxWrapper'
import LoadingComp from '../../../utils/LoadingComp'
import RatingItemView from './RatingItemView'

import { listRatings } from '../../../../services/admins/rating'
import { setRating } from '../../../../store/reducers/admins/actions'
import { BiRefresh } from 'react-icons/bi'

export default () =>{
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    const { rating } = useSelector(state => (state.admins) )

    const handleLoad = () =>{
        setLoading(true)
        listRatings()
            .then((result)=>dispatch(setRating(result)))
            .catch(err=>console.log(err))
            .finally(()=>setLoading(false))
    }

    useEffect(()=>{
        if(rating.length == 0 ){  handleLoad() }
    },[]) 

    return (
        <MaxWrapper>
            <div className="rating-tool-bar">   
                <button className="soft-btn" onClick={handleLoad}> <BiRefresh></BiRefresh> </button>
            </div>

             <div>
                {
                    loading ? <LoadingComp></LoadingComp> :
                    <div className="rating-private-flow">
            
                        {
                            rating?.length > 0 && rating.map((u,i)=>{
                                 return ( <RatingItemView key={i} rating={u}></RatingItemView>)
                            })
                        }
                    </div>
                }
             </div>
        </MaxWrapper>
    )
}