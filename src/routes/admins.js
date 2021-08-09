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


import ProviderEditPage from '../components/pages/admin/Forms/Provider/ProviderEditPage'
import CategoryEditPage from '../components/pages/admin/Forms/Category/CategoryEditPage'
import ProductEditPage from '../components/pages/admin/Forms/Product/ProductEditPage'

export default () => {
    return (

      <Switch>
        <Route path="/admin" exact> <Redirect to="/admins/marts" /> </Route>
        <Guard path="/admins/login" exact>  <AdminLoginPage> </AdminLoginPage> </Guard>
        {/* admin only */}
        <Guard path="/admins/panel" exact access="adminonly" >  <AdminLayout>  <AdminDashBoardPage >  </AdminDashBoardPage>  </AdminLayout></Guard>
        <Guard path="/admins/budgets" exact access="adminonly" >  <AdminLayout>  <BudgetsPage >  </BudgetsPage>  </AdminLayout></Guard>

        <Guard path="/admins/products" exact access="adminonly" >  <AdminLayout>  <ProductsPage >  </ProductsPage>  </AdminLayout></Guard>
        <Guard path="/admins/products/create" exact access="adminonly" >  <AdminLayout>  <ProductEditPage >  </ProductEditPage>  </AdminLayout></Guard>
        <Guard path="/admins/products/update" exact access="adminonly" >  <AdminLayout>  <ProductEditPage >  </ProductEditPage>  </AdminLayout></Guard>

        <Guard path="/admins/marts" exact access="adminonly" >  <AdminLayout>  <MartsPage >  </MartsPage>  </AdminLayout></Guard>
        <Guard path="/admins/marts/create" exact access="adminonly" >  <AdminLayout>  <MartCreatePage >  </MartCreatePage>  </AdminLayout></Guard>
        <Guard path="/admins/marts/update" exact access="adminonly" >  <AdminLayout>  <MartUpdatePage >  </MartUpdatePage>  </AdminLayout></Guard>

        <Guard path="/admins/providers" exact access="adminonly" >  <AdminLayout>  <ProvidersPage >  </ProvidersPage>  </AdminLayout></Guard>
        <Guard path="/admins/providers/create" exact access="adminonly" >  <AdminLayout>  <ProviderEditPage >  </ProviderEditPage>  </AdminLayout></Guard>
        <Guard path="/admins/providers/update" exact access="adminonly" >  <AdminLayout>  <ProviderEditPage >  </ProviderEditPage>  </AdminLayout></Guard>


        <Guard path="/admins/categories" exact access="adminonly" >  <AdminLayout>  <CategoriesPage >  </CategoriesPage>  </AdminLayout></Guard>
        <Guard path="/admins/categories/create" exact access="adminonly" >  <AdminLayout>  <CategoryEditPage >  </CategoryEditPage>  </AdminLayout></Guard>
        <Guard path="/admins/categories/update" exact access="adminonly" >  <AdminLayout>  <CategoryEditPage >  </CategoryEditPage>  </AdminLayout></Guard>
      </Switch>

    )
}