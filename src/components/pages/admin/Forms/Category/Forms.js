import AdminForm from '../../../../utils/AdminForm'
import React, { useState, useEffect } from 'react';
import FormRow from '../../../../utils/FormRow'
import { findCategoriesService, listCategoriesTreeService, listCategoriesService, removeCategoriesService, saveCategoriesService } from '../../../../../services/category-service'
import SearchInputModal from '../../../../utils/SearchInputModal';
const INITIAL_DATA = {
    id: null,
    category_id:"",
    name: "",
}

export const RootForm = ({ inputs, handleInputs, errors, freeze, tree, categories}) =>{
    const { id, name, category_id } = inputs

    const mapCategoriesTree = (categories) =>{
        return categories.map(c=>{
            let selected = false
            if( category_id && (category_id === c.id)) selected= true
            return { ...c, root: true, selected}
        })
    }

    const mapCategoriesList = (categories)=>{
        return ([{value:"", label: "Nenhum"}, ...categories.map(c=>({ value: c.id, label: c.name }))])
    }

    const handleCategorySelected = (data) =>{
        handleInputs('category_id', data)
    }

    return (
        <AdminForm title={ id ? "Atualizar Categoria" : "Nova Categoria"} columns={[6,6,6]} loading={freeze}>

            <FormRow label="Nome" error={errors?.['name']}>
                <input value={name} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Categoria Proveniente" error={errors?.['category_id']}>
                <SearchInputModal value={category_id} title="Categoria" list={mapCategoriesList(categories)} tree={mapCategoriesTree(tree)} onInput={handleCategorySelected}></SearchInputModal>
            </FormRow>

        </AdminForm>
    )
}


export const CategoryState = () =>{
    const [ categories, setCategories ] = useState([])
    const [ tree, setTree ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ freeze, setFreeze ] = useState(false)
    const [ inputs, setInputs, ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) => setInputs(prev => ({  ...prev,  [key]:value  }))

    const clearInputs = (inputs = {}) =>{ setInputs({ ...INITIAL_DATA, ...inputs }); setErrors({})}

    const load = async (id, category_id) =>{
        setLoading(true)
        clearInputs()
        await Promise.all([  
            categories.length === 0 &&
                listCategoriesService()
                .then(setCategories)
                .catch((_=>{})),
            tree.length === 0 &&
                listCategoriesTreeService(true)
                .then(setTree)
                .catch((_=>{})),
            id && 
                findCategoriesService(id)
                .then(result => {
                    if(!result) throw { message: "Não foi possivel encontrar Categoria requerida"}
                    setInputs(result)
                }).catch(err => { throw err.message })
        ]).finally(()=>setLoading(false))
        if(category_id) setInputs({...inputs, category_id })
    }

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

    const remove = async (id) =>{
        if(!id) return;
        setFreeze(true)
        try{ await removeCategoriesService(id) } 
        catch(err) { throw err.message} 
        finally { setFreeze(false) }
    }


    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs, freeze, loading, save, load, remove, tree, categories }
}



/* export const PrimaryUpdateForm = ({ inputs, handleInputs, errors, freeze }) =>{
    const { id, name } = inputs

    return (
        <AdminForm title={"Atualizar Categoria Primaria"} columns={[6,6,6]} loading={freeze}>

            <FormRow label="Nome" error={errors?.['name']}>
                <input value={name} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

        </AdminForm>
    )
} */