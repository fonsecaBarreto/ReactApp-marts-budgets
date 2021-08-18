import React, { useEffect, useState } from 'react'
import './style.css'
import { FaTimes } from 'react-icons/fa'
import PageNavigator from '../Common/PageNavigator'
import ToggleButton from '../Common/ToggleButton'


export default ({ show, toggleMenu, mart}) =>{
    return (
        <aside className={`main-menu ${show ? 'show' : ''}`}>
            <section>

                <ToggleButton onClick={toggleMenu} icon={<FaTimes></FaTimes>}></ToggleButton>
            </section>
            <PageNavigator mart={mart}></PageNavigator>
        </aside>
    )
}