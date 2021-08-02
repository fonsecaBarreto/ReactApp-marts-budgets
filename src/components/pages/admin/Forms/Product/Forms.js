import AdminForm from '../../../../utils/AdminForm'
import React, { useState, useEffect } from 'react';
import FormRow from '../../../../utils/FormRow'
import { findProductService, saveProductservice, removeProductService } from '../../../../../services/products-service'
import { listCategoriesWithFilterService } from '../../../../../services/category-service'
import ImageInput from '../../../../utils/AppInputs/ImageInput';
import { getFilePath } from '../../../../../services/utils-service'
import AppSelectorfrom from '../../../../utils/AppSelector'
import { string } from 'prop-types';
const INITIAL_DATA = {
    id: "",
    description: "",
    presentation: "",
    stock: 0,
    price: 0,
    ncm: "",
    ean: "",
    sku: "",
    brand: "" ,
    image: null,
    image_file: null,
    category: {
        label: "",
        value: ""
    }
}

export const RootForm = ({ inputs, handleInputs, errors, freeze }) =>{
    const { id, category, description, presentation, stock, price, ncm, ean, sku, brand, image, image_file } = inputs
    return (
        <AdminForm title={"Produto"} columns={[6,6,6,6,3,3,2,2,2,6]} loading={freeze}>

            <FormRow label="Image" error={errors?.['image']}>
                <ImageInput src={image} file={image_file} 
                    setFile={value=> handleInputs('image_file', value)}
                    setSrc={value=> handleInputs('image', value)} >
                </ImageInput>
            </FormRow>

            <FormRow className="product-description-textarea" label="Descrição" error={errors?.['description']}>
                <textarea value={description} type="text" onInput={e=>handleInputs('description',e.target.value)}></textarea>
            </FormRow>

            <FormRow label="Aprensentação" error={errors?.['presentation']}>
                <input value={presentation || ''} type="text" onInput={e=>handleInputs('presentation',e.target.value)}></input>
            </FormRow>

            <FormRow label="Marca" error={errors?.['brand']}>
                <input value={brand || ''} type="text" onInput={e=>handleInputs('brand',e.target.value)}></input>
            </FormRow>

            <FormRow label="Quantidade em estoque" error={errors?.['stock']}>
                <input value={stock || 0} type="number" onInput={e=>handleInputs('stock',e.target.value)}></input>
            </FormRow>

            <FormRow label="Preço" error={errors?.['price']}>
                <input value={price || 0} type="number" onInput={e=>handleInputs('price',e.target.value)}></input>
            </FormRow>

            <FormRow label="SKU" error={errors?.['sku']}>
                <input value={sku || ''} type="text" onInput={e=>handleInputs('sku',e.target.value)}></input>
            </FormRow>
          
            <FormRow label="Codigo de Barras (EAN)" error={errors?.['ean']}>
                <input value={ean || ''} type="text" onInput={e=>handleInputs('ean',e.target.value)}></input>
            </FormRow>

            <FormRow label="NCM" error={errors?.['ncm']}>
                <input value={ncm || ''} type="text" onInput={e=>handleInputs('ncm',e.target.value)}></input>
            </FormRow>

            <FormRow label="Categoria" error={errors?.['category_id']}>

                <AppSelectorfrom
                  value={category} onInput={value => handleInputs('category', value)} //returns label and value
                  loadFunction={listCategoriesWithFilterService} 
                  serializeTo={{ label:"name", value: "id" }} // transform date coming from loadfunction intro label and value
                ></AppSelectorfrom>
    
            </FormRow>

        </AdminForm>
    )
}

export const ProductState = () =>{

    const [ loading, setLoading ] = useState(true)
    const [ freeze, setFreeze ] = useState(false)
    const [ inputs, setInputs, ] = useState({ ...INITIAL_DATA })
    const [ errors, setErrors ]= useState({})

    const handleInputs = (key,value) => setInputs(prev => ({  ...prev,  [key]:value  }))

    const clearInputs = (inputs = {}) =>{ 
        setInputs({ ...INITIAL_DATA, ...inputs, 
            image: inputs.image ? getFilePath(inputs.image) : INITIAL_DATA.image,
        })
        setErrors({})
    }

    const load = async (id) =>{
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


    return { handleInputs, inputs, setInputs, errors, setErrors, clearInputs, freeze, loading, save, load, remove }
}

