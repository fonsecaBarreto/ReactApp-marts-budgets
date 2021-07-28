import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Guard from '../components/RouteGuard'

/* Layout */
import AdminLayout from '../components/layouts/Admin';
/* Pages */
import AdminLoginPage from '../components/pages/admin/AdminLogin'
import AdminDashBoardPage from '../components/pages/admin/DashBoardPage'
import MartsPage from '../components/pages/admin/MartsPage'
/* forms */
import MartEditPage from '../components/pages/admin/Forms/Mart/MartEditPage'

export default () => {
    return (

      <Switch>
        <Route path="/admin" exact> <Redirect to="/admins/dashboard" /> </Route>
        <Guard path="/admins/login" exact>  <AdminLoginPage> </AdminLoginPage> </Guard>
        {/* admin only */}
        <Guard path="/admins/dashboard" exact access="adminonly" >  <AdminLayout>  <AdminDashBoardPage >  </AdminDashBoardPage>  </AdminLayout></Guard>
        <Guard path="/admins/marts" exact access="adminonly" >  <AdminLayout>  <MartsPage >  </MartsPage>  </AdminLayout></Guard>

        <Guard path="/admins/marts/create" exact access="adminonly" >  <AdminLayout>  <MartEditPage >  </MartEditPage>  </AdminLayout></Guard>
        <Guard path="/admins/marts/:mart_id/update" exact access="adminonly" >  <AdminLayout>  <MartEditPage >  </MartEditPage>  </AdminLayout></Guard>
      </Switch>

    )
}