import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import './style.css'

import {  listCategoriesTreeService } from '../../../../services/category-service'
import AdminCommonToolBar from "../../../layouts/Admin/AdminCommonToolBar"
import LoadingComp from "../../../utils/LoadingComp"

import TreeView, { TestComp } from '../../../utils/TreeView'
import CategoryItem from "./CategoryItem"
export const CategoryState = () =>{

    const [ categories, setCategories ] = useState([])
    const [ loading, setLoading ] = useState(false)

    useEffect(()=>{
        setLoading(true)
        if(categories.length === 0 ){
            listCategoriesTreeService()
            .then(setCategories)
            .catch(err=>{})
            .finally(()=>setLoading(false))
        }
    },[ ])

    return { categories, loading }
}


export default withRouter(({history}) =>{

    const state = CategoryState()
    const { loading, categories } = state

    const add = () =>{
       history.push('/admins/categories/create') 
    }

    const edit = (id) =>{
        history.push(`/admins/categories/update?cd=${id}`) 
    }
 
    const mapCategoriesTree = (categories) =>{
        return categories.map(c=>({...c, root: true}))
    }
    return (
        <div id="admin-category-page">
            <div className="app-container">
                <AdminCommonToolBar>
                    <button onClick={add}> 
                        Novo
                    </button> 
                </AdminCommonToolBar>
            
                { loading  ? <LoadingComp></LoadingComp> :
                    <TreeView tree={mapCategoriesTree(categories)} component={CategoryItem} useCheckBox={false}></TreeView>
                }
            </div>
        </div>
    )
})