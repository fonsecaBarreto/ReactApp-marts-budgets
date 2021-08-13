import React, { useState } from 'react'
import './style.css'
import Header from './Header'

import { useSelector } from 'react-redux'
import {  } from '../../../store/reducers/global/actions'

export default function MainPublicLayout({children, fixedHeader}) {
    const { mart, admin } = useSelector(state=>state.global)
    return (
        <div id="primary-layout" className={`${fixedHeader ? 'fixedHeader': ''}`} >
          
            <Header admin={admin} mart={mart} ></Header>


          
            <main id="primary-content" >
               
              
                {children}   
              
            </main>
            <footer id="primary-footer">
           
            </footer> 
        </div>
    )
}