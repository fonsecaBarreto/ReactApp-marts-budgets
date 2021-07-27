import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/* Public */
import MartLoginPage from './components/pages/public/MartLogin'
import MartLoginGreetings from './components/pages/public/MartLogin/Greetings'
/* Mart */
import MartBudgetPage from './components/pages/mart/BudgetPage'

/* Admins*/
import AdminLoginPage from './components/pages/admin/AdminLogin'
import AdminDashBoardPage from './components/pages/admin/DashBoardPage'
import MartsPage from './components/pages/admin/MartsPage'

/* public */
import PublicHomePage from './components/pages/public/Home'

/* Layout */
import PrimaryLayout from './components/layouts/MainPublic'

import AdminLayout from './components/layouts/Admin';

/* NotFound */
import NotFoundPage from './components/pages/NotFoundPage'
import ChangePassword from './components/pages/ChangePassword'

import Guard from './components/RouteGuard'

function Routes (){
  return ( 
    <Router>

      <Switch>
        <Route path="/" exact> <Redirect to="/inicio" /> </Route>
        <Route path="/admin" exact> <Redirect to="/admins/marts" /> </Route>
        <Guard path="/inicio" exact>  <PrimaryLayout> <PublicHomePage >  </PublicHomePage>  </PrimaryLayout></Guard>

        <Guard path="/change-password" exact >  <ChangePassword> </ChangePassword> </Guard>

        <Guard path="/login" exact>  <MartLoginPage >  </MartLoginPage> </Guard>
        <Guard path="/login/saudacoes" exact> <PrimaryLayout>  <MartLoginGreetings >  </MartLoginGreetings></PrimaryLayout> </Guard>


        <Guard path="/marts/orcamento" exact access="martonly">   <MartBudgetPage >  </MartBudgetPage> </Guard>
        
        <Guard path="/admins/login" exact>  <AdminLoginPage> </AdminLoginPage> </Guard>
        <Guard path="/admins/dashboard" exact access="adminonly" >  <AdminLayout>  <AdminDashBoardPage >  </AdminDashBoardPage>  </AdminLayout></Guard>
        <Guard path="/admins/marts" exact access="adminonly" >  <AdminLayout>  <MartsPage >  </MartsPage>  </AdminLayout></Guard>

        <Guard path="/*"> <NotFoundPage></NotFoundPage></Guard>  
        
      </Switch>
    </Router>
  )
}

export default Routes

