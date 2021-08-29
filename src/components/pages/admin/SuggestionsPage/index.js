import './style.css'
import MaxWrapper from '../../../layouts/Admin/common/AdminMaxWrapper'
import { listSuggestions } from '../../../../services/admins/suggestions'
import { setSuggestions } from '../../../../store/reducers/admins/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import LoadingComp from '../../../utils/LoadingComp'
import SugggestionItemView from './SuggestionItemView'
import { BiRefresh } from 'react-icons/bi'
export default () =>{
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    const { suggestions } = useSelector(state => (state.admins) )

    const handleLoad = () =>{
        setLoading(true)
        listSuggestions()
            .then((result)=>dispatch(setSuggestions(result)))
            .catch(err=>console.log(err))
            .finally(()=>setLoading(false))
    }
     useEffect(()=>{
        if(suggestions.length == 0 ){  handleLoad() }
    },[]) 
    return (
        <MaxWrapper>
            <div className="suggestion-tool-bar">   
                <button className="soft-btn" onClick={handleLoad}> <BiRefresh></BiRefresh> </button>
            </div>

             <div>
                {
                    loading ? <LoadingComp></LoadingComp> :
                    <div className="suggestion-private-flow">
                    
                        {
                            suggestions.map((u,i)=>{
                                 return ( <SugggestionItemView key={i} suggestion={u}></SugggestionItemView>)

                            })
                        }
  
                    </div>
                }
             </div>

        </MaxWrapper>
    )
}