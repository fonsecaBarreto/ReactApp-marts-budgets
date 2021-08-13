import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/* Public */
import MartLoginPage from '../components/pages/public/MartLogin'
import MartLoginGreetings from '../components/pages/public/MartLogin/Greetings'
/* Mart */
import MartBudgetPage from '../components/pages/mart/BudgetPage'

/* public */
import PublicHomePage from '../components/pages/public/Home'

/* Layout */
import PrimaryLayout from '../components/layouts/MainPublic'



/* NotFound */
import NotFoundPage from '../components/pages/NotFoundPage'
import ChangePassword from '../components/pages/ChangePassword'

import Guard from '../components/RouteGuard'
import AdminRoutes from './admins'

function Routes (){
  return ( 
    <Router>

      <AdminRoutes></AdminRoutes>
     
      <Switch>

        <Route path="/" exact> <Redirect to="/inicio" /> </Route>

        <Guard path="/inicio" exact>  <PrimaryLayout> <PublicHomePage >  </PublicHomePage>  </PrimaryLayout></Guard>

        <Guard path="/change-password" exact >  <ChangePassword> </ChangePassword> </Guard>

        <Guard path="/login" exact>  <MartLoginPage >  </MartLoginPage> </Guard>
        <Guard path="/login/saudacoes" exact> <PrimaryLayout>  <MartLoginGreetings >  </MartLoginGreetings></PrimaryLayout> </Guard>

        <Guard path="/marts/orcamento" exact access="martonly">
           <PrimaryLayout fixedHeader > <MartBudgetPage ></MartBudgetPage> </PrimaryLayout>
        </Guard>

        {/* <Guard path="/*"> <NotFoundPage></NotFoundPage></Guard>   */}
        
      </Switch>
    </Router>
  )
}

export default Routes

