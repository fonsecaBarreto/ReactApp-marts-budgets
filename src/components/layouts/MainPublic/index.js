import React, { useState } from 'react'
import './style.css'
import Header from './Header'

export default function MainPublicLayout({children}) {

    return (
        <div id="primary-layout" >
            <header id="primary-header">
                <Header  ></Header>
            </header>
          
            <main id="primary-content" >
                {children}   
            </main>
            <footer id="primary-footer">
           
            </footer> 
        </div>
    )
}