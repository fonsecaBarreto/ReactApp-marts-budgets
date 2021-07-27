import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/* Public */
import MartLoginPage from './components/pages/public/MartLogin'
import MartLoginGreetings from './components/pages/public/MartLogin/Greetings'
/* Mart */
import MartBudgetPage from './components/pages/mart/BudgetPage'

/* Admin dashboard */
import AdminLoginPage from './components/pages/admin/AdminLogin'
import AdminDashBoardPage from './components/pages/admin/DashBoardPage'

/* public */
import PublicHomePage from './components/pages/public/Home'

/* Layout */

import InitialLayout from './components/layouts/Initial';

/* NotFound */

import NotFoundPage from './components/pages/NotFoundPage'


import Guard from './components/RouteGuard'
function Routes (){
  return ( 
    <Router>

      <Switch>
        <Route path="/" exact> <Redirect to="/inicio" /> </Route>
        <Guard path="/inicio" exact>  <InitialLayout> <PublicHomePage >  </PublicHomePage>  </InitialLayout></Guard>

        <Guard path="/login" exact>  <InitialLayout>  <MartLoginPage >  </MartLoginPage></InitialLayout> </Guard>
        <Guard path="/login/saudacoes" exact> <InitialLayout>  <MartLoginGreetings >  </MartLoginGreetings></InitialLayout> </Guard>


        <Guard path="/marts/orcamento" exact access="martonly">  <InitialLayout>  <MartBudgetPage >  </MartBudgetPage> </InitialLayout> </Guard>
        
        <Guard path="/admins/login" exact>  <InitialLayout> <AdminLoginPage> </AdminLoginPage> </InitialLayout></Guard>
        <Guard path="/admins/dashboard" exact access="adminonly">  <InitialLayout>  <AdminDashBoardPage >  </AdminDashBoardPage>  </InitialLayout></Guard>

        <Guard path="/*"> <NotFoundPage></NotFoundPage></Guard>  
        
      </Switch>
    </Router>
  )
}

export default Routes

