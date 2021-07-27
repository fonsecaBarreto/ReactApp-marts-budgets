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
    dispatch(setLoading(true)) 
    login(access)
  },[ path ]) 

  const login = async () =>{
      setRequestWasMade(false)
      Promise.all([  
        !mart &&
        AuthMart()
          .then(r=>dispatch(setMart(r)))
          .catch(_=>{}),  

        !admin &&
        AuthAdmin()
          .then(r=>dispatch(setAdmin(r)))
          .catch(_=>{})
      ])
      .finally(() => setRequestWasMade(true))
  }

  useEffect(()=>{
    if(!access) return dispatch(setLoading(false))
    else if(access === "martonly" && mart) return dispatch(setLoading(false))
    else if(access === "adminonly" && admin) return dispatch(setLoading(false))

    if(requestWasMade === true){
      if(access === "martonly" && !mart) return history.push("/login")
      if(access === "adminonly" && !admin) return history.push("/admins/login")
      return dispatch(setLoading(false))
    } 
    
  },[ requestWasMade ]) 
  return <Route location={location} {...rest} render={(props) => ( <Component { ...props } path={path} /> )} ></Route>
})


export default Guard