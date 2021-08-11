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


export default () => {
    return (

      <Switch>
        <Route path="/admin" exact> <Redirect to="/admins/marts" /> </Route>
        <Guard path="/admins/login" exact>  <AdminLoginPage> </AdminLoginPage> </Guard>
        {/* admin only */}
        <Guard path="/admins/panel" exact access="adminonly" >  <AdminLayout>  <AdminDashBoardPage >  </AdminDashBoardPage>  </AdminLayout></Guard>
        <Guard path="/admins/budgets" exact access="adminonly" >  <AdminLayout>  <BudgetsPage >  </BudgetsPage>  </AdminLayout></Guard>

        <Guard path="/admins/products" exact access="adminonly" >  <AdminLayout>  <ProductsPage >  </ProductsPage>  </AdminLayout></Guard>

        <Guard path="/admins/items/create" exact access="adminonly" >  <AdminLayout>  <ItemCreatePage >  </ItemCreatePage>  </AdminLayout></Guard>
        <Guard path="/admins/items/update" exact access="adminonly" >  <AdminLayout>  <ItemUpdatePage >  </ItemUpdatePage>  </AdminLayout></Guard>

        <Guard path="/admins/products/create" exact access="adminonly" >  <AdminLayout>  <ProductCreatePage >  </ProductCreatePage>  </AdminLayout></Guard>
        <Guard path="/admins/products/update" exact access="adminonly" >  <AdminLayout>  <ProductUpdatePage >  </ProductUpdatePage>  </AdminLayout></Guard>

        <Guard path="/admins/marts" exact access="adminonly" >  <AdminLayout>  <MartsPage >  </MartsPage>  </AdminLayout></Guard>
        <Guard path="/admins/marts/create" exact access="adminonly" >  <AdminLayout>  <MartCreatePage >  </MartCreatePage>  </AdminLayout></Guard>
        <Guard path="/admins/marts/update" exact access="adminonly" >  <AdminLayout>  <MartUpdatePage >  </MartUpdatePage>  </AdminLayout></Guard>

        <Guard path="/admins/providers" exact access="adminonly" >  <AdminLayout>  <ProvidersPage >  </ProvidersPage>  </AdminLayout></Guard>
        <Guard path="/admins/providers/create" exact access="adminonly" >  <AdminLayout>  <ProviderCreatePage >  </ProviderCreatePage>  </AdminLayout></Guard>
        <Guard path="/admins/providers/update" exact access="adminonly" >  <AdminLayout>  <ProviderUpdatePage >  </ProviderUpdatePage>  </AdminLayout></Guard>


        <Guard path="/admins/categories" exact access="adminonly" >  <AdminLayout>  <CategoriesPage >  </CategoriesPage>  </AdminLayout></Guard>
        <Guard path="/admins/categories/create" exact access="adminonly" >  <AdminLayout>  <CategoryEditPage >  </CategoryEditPage>  </AdminLayout></Guard>
        <Guard path="/admins/categories/update" exact access="adminonly" >  <AdminLayout>  <CategoryEditPage >  </CategoryEditPage>  </AdminLayout></Guard>
      </Switch>

    )
}