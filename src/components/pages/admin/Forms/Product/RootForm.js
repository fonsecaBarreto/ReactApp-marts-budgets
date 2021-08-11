import AdminForm from '../../../../utils/AdminForm'
import React, { useState, useEffect } from 'react';
import './style.css'
import FormRow from '../../../../utils/FormRow'
import { ListCategoriesScrew } from '../../../../../services/category-service'
import ImageInput from '../../../../utils/AppInputs/ImageInput';
import AppSelector from '../../../../utils/AppInputs/AppSelector'
import { CategoyItemView } from './ScrewViews'

import CustomSelectRowfrom from './CustomSelectRow'

import { ListItemsScrew } from '../../../../../services/item-service'


export const ItemSelectorView = ({entry}) => {
    const { name } = entry
    return (<span className="screw-item-view">
        <span className="font-bold  ">
            {name}
        </span>
    </span>)
}


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
    item: {
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


export const RootForm = ({ inputs, errorsState, clearAll, children }) =>{

    const { data, setData, handleInputs } = inputs
    const { id, item, description, presentation, ncm, ean, sku, brand, image, image_file } = data
    const { errors, setErrors } = errorsState

    return (
        <AdminForm title={"Produto"} columns={[1,5,2,2,2,3,3]}>

           
            <FormRow label="Imagem" error={errors?.['image']}>
                <ImageInput src={image} file={image_file} 
                    setFile={value=> handleInputs('image_file', value)}
                    setSrc={value=> handleInputs('image', value)} >
                </ImageInput>
            </FormRow>
            
            <div className="flex-column">

                <FormRow className="product-description-textarea" label="Especificação" error={errors?.['description']}>
                    <textarea rows={1} value={description} type="text" onInput={e=>handleInputs('description',e.target.value)}></textarea>
                </FormRow>

                <FormRow label="Apresentação" error={errors?.['presentation']}>
                    <input value={presentation || ''} type="text" onInput={e=>handleInputs('presentation',e.target.value)}></input>
                </FormRow>
            </div>

            <FormRow label="SKU" error={errors?.['sku']}>
                <input value={sku || ''} type="text" onInput={e=>handleInputs('sku',e.target.value)}></input>
            </FormRow>
          
            <FormRow label="EAN" error={errors?.['ean']}>
                <input value={ean || ''} type="text" onInput={e=>handleInputs('ean',e.target.value)}></input>
            </FormRow>

            <FormRow label="NCM" error={errors?.['ncm']}>
                <input value={ncm || ''} type="text" onInput={e=>handleInputs('ncm',e.target.value)}></input>
            </FormRow>

            <FormRow label={"Item"} error={errors?.['item_id']}>
                <AppSelector 
                    onLoad={ListItemsScrew}
                    value={item}
                    component={ItemSelectorView}
                    onInput={result =>{
                        if(!result) return handleInputs('item',INITIAL_DATA.item)
                        handleInputs('item',{label: result.name, value: result.id})
                    }}>
                </AppSelector>
            </FormRow>

            <CustomSelectRowfrom
                label="Marcas" error={errors?.['brand_id']}
                value={brand}
                onInput={brand =>{
                    if(!brand) return handleInputs('brand',INITIAL_DATA.brand)
                    handleInputs('brand',{label: brand.name, value: brand.id})
                }}
            ></CustomSelectRowfrom>
        
        </AdminForm>
    )
}


export default RootForm