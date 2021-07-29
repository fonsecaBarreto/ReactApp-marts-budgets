import AdminForm from '../../../../utils/AdminForm'
import React, { useState, useEffect } from 'react';
import FormRow from '../../../../utils/FormRow'
import { findCategoriesService, listCategoriesPrimariesService, removeCategoriesService, saveCategoriesService } from '../../../../../services/category-service'

const INITIAL_DATA = {
    id: null,
    category_id:null,
    name: "",
}

export const RootForm = ({ inputs, handleInputs, errors, freeze, primaries }) =>{
    const { id, name, category_id } = inputs

    const mapOptions = (primaries) =>{
        return [ { value:"", label:"Nenhum"}, ...primaries.map(p=>({ value:p.id, label: p.name })) ]
    }

    return (
        <AdminForm title={"Fornecedor"} columns={[6,6,6]} loading={freeze}>

            <FormRow label="Nome" error={errors?.['name']}>
                <input value={name} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Categoria" error={errors?.['category_id']}>

                <select onChange={e=> handleInputs('category_id', e.target.value)}  value={category_id} defaultValue={category_id} >
                    { mapOptions(primaries).map((v,i)=>{
                        return (<option key={i} value={v.value} >{v.label}</option>)
                    })}
                </select> 

            </FormRow>

        </AdminForm>
    )
}

export const PrimaryUpdateForm = ({ inputs, handleInputs, errors, freeze }) =>{
    const { id, name } = inputs

    return (
        <AdminForm title={"Fornecedor"} columns={[6,6,6]} loading={freeze}>

            <FormRow label="Nome" error={errors?.['name']}>
                <input value={name} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

        </AdminForm>
    )
}

export const CategoryState = () =>{


    const [ primaries, setPrimaries ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ freeze, setFreeze ] = useState(false)
    const [ inputs, setInputs, ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})


    useEffect(()=>{
        setLoading(true)
        listCategoriesPrimariesService()
            .then(setPrimaries)
            .catch((_=>{}))
            .finally(()=>setLoading(false))
    },[])

    const handleInputs = (key,value) => setInputs(prev => ({  ...prev,  [key]:value  }))

    const clearInputs = (inputs = {}) => setInputs({ ...INITIAL_DATA, ...inputs })

    /* actions */

    const save = async () =>{
        setFreeze(true)
        try{
            const result = await saveCategoriesService(inputs)
            clearInputs(result)
            setErrors({})
            return result
        } catch(err) {
            if(err.params) setErrors(err.params)
            throw err.message
        } finally {  setFreeze(false) } 
    }

    const load = async (id) =>{
        clearInputs()
        if(!id) return;
        setLoading(true)
        try{
            const result = await findCategoriesService(id)
            if(!result) throw { message: "Não foi possivel encontrar Categoria requerida"}
            setInputs(result)
        } catch(err) { throw err.message } 
        finally { setLoading(false) }
    }

    const remove = async (id) =>{
        if(!id) return;
        setLoading(true)
        try{ await removeCategoriesService(id) } 
        catch(err) { throw err.message} 
        finally { setLoading(false) }
    }


    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs, freeze, loading, save, load, remove, primaries }
}

