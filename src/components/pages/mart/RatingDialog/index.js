import React, { useEffect, useState } from 'react'
import './style.css'
import Dialog from '../../../utils/Dialog'
import LoadingComp from '../../../utils/LoadingComp'
import FormRow from '../../../utils/FormRow'
import StarRating from './StarRating'
import {ImStarFull} from 'react-icons/im'
import { MakeRating } from '../../../../services/marts/ratings'
import {  useDispatch, useSelector } from 'react-redux'
import { showFailure, showSuccess } from '../../../../store/reducers/dialog/actions'
const INITIAL_DATA = {
    grade: 0,
    description: ""
}

export default ({ show, onClose,  }) =>{
    const dispatch = useDispatch()
    const [ data, setData ] = useState(INITIAL_DATA)
    const setGrade = (value) => setData(prev=>({...prev, grade: value}))
    const handleInputs = (key,value, capital) => {
        if(capital){
            value = value.replace(/\b\w/g, c => c.toUpperCase());
        }
        setData(prev => ({  ...prev,  [key]:value  }))
    }

    const handleSubmit = async () =>{
        try{

            await MakeRating(data)
            dispatch(showSuccess("Obrigado pela colaboração", "Trabalhamos sempre para melhor atende-lo","Obrigado!",()=>{
                onClose()
            }))
        }catch(err){
            dispatch(showFailure(err.message))
        }
    }

    return (
        <Dialog icon={<ImStarFull></ImStarFull>} show={show} onClose={onClose} title={"Avalie nosso serviço."}>
            <div className="rating-dialog">
                <FormRow className="rating-form-row" label="Nota de 0 a 5:">
                    <StarRating grade={data.grade} setGrade={setGrade}></StarRating>
                </FormRow>

                <FormRow className="rating-form-row" label="Como podemos melhorar?">
                    <textarea  value={data.description} onInput={(e)=>handleInputs('description',e.target.value)}></textarea>
                </FormRow>

                <button className="soft-btn rating-form-submit " onClick={handleSubmit}> Avaliar </button>
        
            </div>
        </Dialog>
    )
}