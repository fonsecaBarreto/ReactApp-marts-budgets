import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import './style.css'

import {  listCategoriesTreeService } from '../../../../services/category-service'
import AdminCommonToolBar from "../../../layouts/Admin/AdminCommonToolBar"
import LoadingComp from "../../../utils/LoadingComp"

import TreeView, { TestComp } from '../../../utils/TreeView'
import CategoryItem from "./CategoryItem"
import TopWrapperGrid from '../../../layouts/Admin/common/ListPageWrapper/TopWrapperGrid'

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

    const add = () => { history.push('/admins/categories/create')  }

    const mapCategoriesTree = (categories) =>{
        return categories.map(c=>({...c, root: true}))
    }
    return (


        <div id="admin-category-page">
       
            <TopWrapperGrid>
                <AdminCommonToolBar>
                    <button onClick={add}> 
                        Novo
                    </button> 
                </AdminCommonToolBar>
            </TopWrapperGrid>
  

            { loading  ? <LoadingComp></LoadingComp> :
                <div className="category-tree-from-page">
                    <TreeView tree={mapCategoriesTree(categories)} component={CategoryItem} useCheckBox={false}></TreeView>
                </div>
            }
         
        </div>
    )
})