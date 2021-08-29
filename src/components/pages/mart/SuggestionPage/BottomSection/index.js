import './style.css'
import { RiSkipForwardLine, RiStopCircleLine } from  'react-icons/ri'
import { MakeSuggestions } from '../../../../../services/marts/suggestions'
import { showFailure, showSuccess } from '../../../../../store/reducers/dialog/actions'
import { setMart } from '../../../../../store/reducers/global/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default ({state}) =>{
    const { mart } = useSelector(state => state.global)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSubmit = async () =>{
        try{
            await MakeSuggestions({ items: state.inputsState.data})
            dispatch(showSuccess('Obrigado pela sua colaboração'))
            dispatch(setMart({ ...mart, checkList:{ ...mart.checkList, first_suggestions:true} }))
            return history.push('/marts/orcamento')
        }catch(err){
            if(err.params){
                state.errorsState.setErrors(err.params)
            }
            dispatch(showFailure(err.message))
        }
    }


    const handleSkip = async () =>{
        try{
            await MakeSuggestions({ })
            dispatch(setMart({ ...mart, checkList:{ ...mart.checkList, first_suggestions:true } }))
            return history.push('/marts/orcamento')
        }catch(err){
            if(err.params){
                state.errorsState.setErrors(err.params)
            }
            dispatch(showFailure(err.message))
        }
    }
    return (
        <section>
            <button className="soft-btn" onClick={handleSubmit}> Finalizar </button>
            <button className="soft-btn sp-btn-warning" onClick={handleSkip}> Pular <RiSkipForwardLine></RiSkipForwardLine> </button>
        </section>
    )
}