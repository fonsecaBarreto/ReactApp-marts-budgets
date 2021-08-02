import React, { useEffect, useState } from 'react'
import {  Route } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { authService as AuthMart} from '../../services/mart-login-service'
import { authService as AuthAdmin} from '../../services/admin-login-service'
import { setMart, setAdmin, setLoading } from '../../store/reducers/global/actions'
import { waitFor } from '@testing-library/react';

const Guard = withRouter(({ history, access, location, component: Component, path, ...rest } ) => {
  const dispatch = useDispatch()
  const [ requestWasMade, setRequestWasMade ] = useState(false)
  const { mart, admin }  = useSelector(state=>state.global) 

  useEffect(()=>{
    login(access)
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  },[ path ]) 

 

  const login = async (access) =>{

      dispatch(setLoading(true)) 

      if(!access) dispatch(setLoading(false))
      else if(access === "martonly" && mart) dispatch(setLoading(false))
      else if(access === "adminonly" && admin) dispatch(setLoading(false))

      Promise.all([  
        !mart &&
        AuthMart()
          .then(r=>dispatch(setMart(r)))
          .catch( err => { if(access == "martonly") return history.push(`/login?e=${err.message}`);  }),  
        !admin &&
        AuthAdmin()
          .then(r=>dispatch(setAdmin(r)))
          .catch( err => { if(access == "adminonly") return history.push(`/admins/login?e=${err.message}`); })
      ])
      .finally(() =>{ 
        dispatch(setLoading(false)) 
      })
  }

  return <Route location={location} {...rest} render={(props) => ( <Component { ...props } path={path} /> )} ></Route>
})


export default Guard