import React, { useEffect, useState } from 'react';
import AdminForm from '../../../../utils/AdminForm';
import FormRow from '../../../../utils/FormRow';


import { ListCategoriesScrew } from '../../../../../services/category-service'
import AppSelector from '../../../../utils/AppInputs/AppSelector'

import { IoMdArrowDropleft } from 'react-icons/io'

export const CategoryItemView = ({entry}) => {
    const { name, bread_crumbs } = entry
    return (<span className="screw-item-view">
        <span className="font-bold  "> {name} </span>
        {bread_crumbs?.length > 0 && bread_crumbs.map((b,i)=>(
            <span key={i} className="smaller muted" style={{padding:2} }><IoMdArrowDropleft></IoMdArrowDropleft> {b}</span> 
        ))} </span>)
}


const INITIAL_DATA = {
    id: null,
    name: "",
    description: "",
    category: {
        label: "",
        value: ""
    }
}


export const FormState = () =>{
    const [ data, setData ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) => setData(prev => ({  ...prev,  [key]:value  }))

    const clearAll = () =>{ 
        setData({ ...INITIAL_DATA }); 
        setErrors({})
    }

    return {
        inputs: { data, setData, handleInputs },
        errorsState: { errors, setErrors },
        clearAll
    }
}



const RootForm = ({ inputs, errorsState}) =>{

    const { data, handleInputs } = inputs
    const { name, description, category } = data
    const { errors } = errorsState

    return (
        <AdminForm title={"Item"} columns={[6,6,6]}>

            <FormRow label="Nome *" error={errors?.['name']}>
                <input value={name || ''} type="text" onInput={e=>handleInputs('name',e.target.value)}></input>
            </FormRow>

            <FormRow label="Descrição" error={errors?.['description']}>
                <textarea value={description || ""} onInput={e=>handleInputs('description',e.target.value)}></textarea>
            </FormRow>

            <FormRow label="Categoria" error={errors?.['category_id']}>
                <AppSelector 
                    onLoad={ListCategoriesScrew}
                    value={category}
                    component={CategoryItemView}
                    onInput={category =>{
                        if(!category) return handleInputs('category',INITIAL_DATA.category)
                        handleInputs('category',{label: category.name, value: category.id})
                    }}> 
                </AppSelector>
            </FormRow>

    </AdminForm>
    )
}

export default RootForm