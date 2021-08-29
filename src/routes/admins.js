import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Guard from '../components/RouteGuard'

/* Layout */
import AdminLayout from '../components/layouts/Admin';

/* Pages */
import AdminLoginPage from '../components/pages/admin/AdminLogin'
import AdminDashBoardPage from '../components/pages/admin/DashBoardPage'
import MartsPage from '../components/pages/admin/MartsPage'
import BudgetsPage from '../components/pages/admin/BudgetsPage'
import ProductsPage from '../components/pages/admin/ProductsPage'
import ProvidersPage from '../components/pages/admin/ProvidersPage'
import CategoriesPage from '../components/pages/admin/CategoriesPage'
/* forms */

/* marts */
import MartCreatePage from '../components/pages/admin/Forms/Mart/presentation/CreatePage'
import MartUpdatePage from '../components/pages/admin/Forms/Mart/presentation/UpdatePage'

/* provider */
import ProviderCreatePage from '../components/pages/admin/Forms/Provider/presentation/CreatePage'
import ProviderUpdatePage from '../components/pages/admin/Forms/Provider/presentation/UpdatePage'

/* product */
import ProductCreatePage from '../components/pages/admin/Forms/Product/presentation/CreatePage'
import ProductUpdatePage from '../components/pages/admin/Forms/Product/presentation/UpdatePage'
/* item */
import ItemCreatePage from '../components/pages/admin/Forms/ProductItem/presentation/CreatePage'
import ItemUpdatePage from '../components/pages/admin/Forms/ProductItem/presentation/UpdatePage'

import CategoryEditPage from '../components/pages/admin/Forms/Category/CategoryEditPage'

/* suggestiosn */
import SuggestionPage from '../components/pages/admin/SuggestionsPage'
import RatingPage from '../components/pages/admin/RatingPage'
export default () => {
    return (
      <AdminLayout>

        <Switch >

          <Guard path="/admins/login" exact> <AdminLoginPage></AdminLoginPage>  </Guard> 

          <Guard path="/admins/panel" exact access="adminonly" >   <AdminDashBoardPage >  </AdminDashBoardPage> </Guard>

          <Guard path="/admins/suggestions" exact access="adminonly" >   <SuggestionPage >  </SuggestionPage> </Guard>
          <Guard path="/admins/rating" exact access="adminonly" >   <RatingPage >  </RatingPage> </Guard>

          <Guard path="/admins/budgets" exact access="adminonly" >   <BudgetsPage >  </BudgetsPage>  </Guard>


          
          <Guard path="/admins/products" exact access="adminonly" >    <ProductsPage >  </ProductsPage>  </Guard>

          <Guard path="/admins/items/create" exact access="adminonly" >   <ItemCreatePage >  </ItemCreatePage> </Guard>
          <Guard path="/admins/items/update" exact access="adminonly" >    <ItemUpdatePage >  </ItemUpdatePage> </Guard>

          <Guard path="/admins/products/create" exact access="adminonly" >  <ProductCreatePage >  </ProductCreatePage>  </Guard>
          <Guard path="/admins/products/update" exact access="adminonly" >   <ProductUpdatePage >  </ProductUpdatePage>  </Guard>

          <Guard path="/admins/marts" exact access="adminonly" >   <MartsPage >  </MartsPage>  </Guard>
          <Guard path="/admins/marts/create" exact access="adminonly" >    <MartCreatePage >  </MartCreatePage> </Guard>
          <Guard path="/admins/marts/update" exact access="adminonly" >    <MartUpdatePage >  </MartUpdatePage>  </Guard>

          <Guard path="/admins/providers" exact access="adminonly" >    <ProvidersPage >  </ProvidersPage>  </Guard>
          <Guard path="/admins/providers/create" exact access="adminonly" >   <ProviderCreatePage >  </ProviderCreatePage>  </Guard>
          <Guard path="/admins/providers/update" exact access="adminonly" >    <ProviderUpdatePage >  </ProviderUpdatePage>  </Guard>

          <Guard path="/admins/categories" exact access="adminonly" >    <CategoriesPage >  </CategoriesPage> </Guard>
          <Guard path="/admins/categories/create" exact access="adminonly" >  <CategoryEditPage >  </CategoryEditPage> </Guard>
          <Guard path="/admins/categories/update" exact access="adminonly" >   <CategoryEditPage >  </CategoryEditPage>  </Guard>
      
        </Switch>
      </AdminLayout>

    )
} 