import React, { useEffect } from 'react'
import {  Route } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { authService as AuthMart} from '../../services/mart-login-service'
import { authService as AuthAdmin} from '../../services/admin-login-service'
import { setMart, setAdmin, setLoading } from '../../store/reducers/global/actions'

const Guard = withRouter(({ history, access, location, component: Component, path, ...rest } ) => {
  const dispatch = useDispatch()
  const { mart, admin }  = useSelector(state=>state.global) 

  const login = async (access) =>{

    //auth mart and admin
    const list = []
    if(!mart) list.push( AuthMart().then(data=> dispatch(setMart(data))).catch(_=>{}))
    if(!admin)list.push( AuthAdmin().then(data=> dispatch(setAdmin(data))).catch(_=>{}))

    if(!access) return dispatch(setLoading(false)) ;

    if(admin && access == "adminonly") return dispatch(setLoading(false)) ;
    if(mart && access == "martonly") return dispatch(setLoading(false)) ;

    if(list.length > 0) { await Promise.all(list) }

    switch (access) {
      case 'martonly':
        if(!mart) return history.push("/login") ;break;
      case 'adminonly':
        if(!admin) return history.push("/admins/login") ;break;
    }

    return  dispatch(setLoading(false)) ;
  }
  useEffect(()=>{

      dispatch(setLoading(true)) 
      login(access)

    },[ path ]) 
  return <Route location={location} {...rest} render={(props) => ( <Component { ...props } path={path} /> )} ></Route>
})


export default Guard