import AdminForm from '../../../../utils/AdminForm'
import React, { useState, useEffect } from 'react';
import './style.css'
import FormRow from '../../../../utils/FormRow'
import { ListCategoriesScrew } from '../../../../../services/category-service'
import ImageInput from '../../../../utils/AppInputs/ImageInput';
import AppSelector from '../../../../utils/AppInputs/AppSelector'
import { CategoyItemView } from './ScrewViews'

import CustomSelectRowfrom from './CustomSelectRow'
const INITIAL_DATA = {
    id: null,
    description: "",
    presentation: "",
    ncm: "",
    ean: "",
    sku: "",
    image: null,
    image_file: null,
    brand: {
        label: "",
        value: ""
    },
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

 /*    const load = async (id) =>{
        setLoading(true)
        clearInputs()
        await Promise.all([
            id &&
            findProductService(id)
            .then(result => {
                if(!result) throw { message: "Não foi possivel encontrar Produto requerido"}
                clearInputs(result)
            }).catch(err => { throw err.message })
        ]).finally(()=>setLoading(false))
    }

    const save = async () =>{
        setFreeze(true)
        try{
            const result = await saveProductservice(inputs)
            clearInputs(result)
            return result
        } catch(err) {
            if(err.params) setErrors(err.params)
            throw err.message
        } finally {  setFreeze(false) } 
    }

    const remove = async (id) =>{
        if(!id) return;
        setFreeze(true)
        try{ await removeProductService(id) } 
        catch(err) { throw err.message} 
        finally { setFreeze(false) }
    }


    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs, freeze, loading, save, load, remove } */
}


export const RootForm = ({ inputs, errorsState, clearAll, children }) =>{

    const { data, setData, handleInputs } = inputs
    const { id, category, description, presentation, ncm, ean, sku, brand, image, image_file } = data
    const { errors, setErrors } = errorsState

    return (
        <AdminForm title={"Produto"} columns={[6,1,5,6,6,2,2,2]}>

            <FormRow label="Categoria" error={errors?.['category_id']}>
                <AppSelector 
                    onLoad={ListCategoriesScrew}
                    value={category}
                    component={CategoyItemView}
                    onInput={category =>{
                        if(!category) return handleInputs('category',INITIAL_DATA.category)
                        handleInputs('category',{label: category.name, value: category.id})
                    }}> 
                </AppSelector>
            </FormRow>

            <FormRow label="Imagem" error={errors?.['image']}>
                <ImageInput src={image} file={image_file} 
                    setFile={value=> handleInputs('image_file', value)}
                    setSrc={value=> handleInputs('image', value)} >
                </ImageInput>
            </FormRow>

            <FormRow className="product-description-textarea" label="Descrição" error={errors?.['description']}>
                <textarea value={description} type="text" onInput={e=>handleInputs('description',e.target.value)}></textarea>
            </FormRow>

            <FormRow label="Apresentação" error={errors?.['presentation']}>
                <input value={presentation || ''} type="text" onInput={e=>handleInputs('presentation',e.target.value)}></input>
            </FormRow>

            <CustomSelectRowfrom
                label="Marcas" error={errors?.['brand_id']}
                value={brand}
                onInput={brand =>{
                    if(!brand) return handleInputs('brand',INITIAL_DATA.brand)
                    handleInputs('brand',{label: brand.name, value: brand.id})
                }}
            ></CustomSelectRowfrom>

            <FormRow label="SKU" error={errors?.['sku']}>
                <input value={sku || ''} type="text" onInput={e=>handleInputs('sku',e.target.value)}></input>
            </FormRow>
          
            <FormRow label="Codigo de Barras (EAN)" error={errors?.['ean']}>
                <input value={ean || ''} type="text" onInput={e=>handleInputs('ean',e.target.value)}></input>
            </FormRow>

            <FormRow label="NCM" error={errors?.['ncm']}>
                <input value={ncm || ''} type="text" onInput={e=>handleInputs('ncm',e.target.value)}></input>
            </FormRow>
        
        </AdminForm>
    )
}


export default RootForm