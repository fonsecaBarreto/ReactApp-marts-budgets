import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/* Public */
import MartLoginPage from '../components/pages/public/MartLogin'

/* Mart */
import MartBudgetPage from '../components/pages/mart/BudgetPage'
import SuggestionPage from '../components/pages/mart/SuggestionPage';
/* public */
import PublicHomePage from '../components/pages/public/Home'

/* Layout */
import PrimaryLayout from '../components/layouts/MainPublic'



/* NotFound */
import NotFoundPage from '../components/pages/NotFoundPage'
import ChangePassword from '../components/pages/ChangePassword'


/* admins */

import AdminLoginPage from '../components/pages/admin/AdminLogin'


/* guard */
import Guard from '../components/RouteGuard'
import AdminRoutes from './admins'
function Routes (){
  return ( 
    <Router>


      <Switch>

        <Route path="/" exact> <Redirect to="/inicio" /> </Route>

        <Guard path="/inicio" exact>  <PrimaryLayout> <PublicHomePage >  </PublicHomePage>  </PrimaryLayout></Guard>

        <Guard path="/change-password" exact >  <ChangePassword> </ChangePassword> </Guard>

        <Guard path="/login" exact> 
            <MartLoginPage >  </MartLoginPage> 
        </Guard> 
        

        <Guard path="/marts/orcamento" exact access="martonly">
           <PrimaryLayout fixedHeader > <MartBudgetPage ></MartBudgetPage> </PrimaryLayout>
        </Guard> 
        <Guard path="/marts/sugestao" exact access="martonly">
           <PrimaryLayout fixedHeader > <SuggestionPage ></SuggestionPage> </PrimaryLayout>
        </Guard> 

        {/* NOT FOUND  */}
        <Route path="/notfound" exact> <NotFoundPage></NotFoundPage></Route>   
        
        {/* ADMINS */}
        <Route path="/admin" exact> <Redirect to="/admins/panel" /> </Route> 

        <Guard path="/admins/login" exact> <AdminLoginPage></AdminLoginPage>  </Guard> 

        <Route path="/admins/:path?">

          <AdminRoutes ></AdminRoutes> 
        
        </Route>
        
       <Route path="/*" > <Redirect to="/notfound" /> </Route>  
        
      </Switch>
    </Router>
  )
}

export default Routes

