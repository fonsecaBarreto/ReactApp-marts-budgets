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
/* forms */
import MartEditPage from '../components/pages/admin/Forms/Mart/MartEditPage'

export default () => {
    return (

      <Switch>
        <Route path="/admin" exact> <Redirect to="/admins/panel" /> </Route>
        <Guard path="/admins/login" exact>  <AdminLoginPage> </AdminLoginPage> </Guard>
        {/* admin only */}
        <Guard path="/admins/panel" exact access="adminonly" >  <AdminLayout>  <AdminDashBoardPage >  </AdminDashBoardPage>  </AdminLayout></Guard>
        <Guard path="/admins/marts" exact access="adminonly" >  <AdminLayout>  <MartsPage >  </MartsPage>  </AdminLayout></Guard>
        <Guard path="/admins/products" exact access="adminonly" >  <AdminLayout>  <ProductsPage >  </ProductsPage>  </AdminLayout></Guard>
        <Guard path="/admins/budgets" exact access="adminonly" >  <AdminLayout>  <BudgetsPage >  </BudgetsPage>  </AdminLayout></Guard>
        <Guard path="/admins/providers" exact access="adminonly" >  <AdminLayout>  <ProvidersPage >  </ProvidersPage>  </AdminLayout></Guard>

        <Guard path="/admins/marts/create" exact access="adminonly" >  <AdminLayout>  <MartEditPage >  </MartEditPage>  </AdminLayout></Guard>
        <Guard path="/admins/marts/:mart_id/update" exact access="adminonly" >  <AdminLayout>  <MartEditPage >  </MartEditPage>  </AdminLayout></Guard>
      </Switch>

    )
}