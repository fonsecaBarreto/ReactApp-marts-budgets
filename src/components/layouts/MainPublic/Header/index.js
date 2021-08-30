import React, { useEffect, useState } from 'react'
import './style.css'

import { FaBars } from 'react-icons/fa'
import Logo from '../../../../assets/logo.svg'
import { useHistory } from 'react-router-dom'
import PageNavigator from '../Common/PageNavigator'
import ToggleButton from '../Common/ToggleButton'
import { withRouter } from 'react-router-dom'
export default ({toggleMenu, admin, mart}) => {
    const history = useHistory()
    const [colorFull, setColorFull] = useState(false)
    useEffect(()=>{ window.addEventListener("scroll", handleScroll);},[])

    const handleScroll=()=>{
        if (window.pageYOffset > 8) {setColorFull(true)
        }else{setColorFull(false)}
    }
    

    return (
        <header id="primary-header" className={colorFull? 'colorful': ''}>
            <div className="primary-header-content app-container">
                <section className="section-one" >
                    <img className="ph-logo"  src={Logo} alt="logo" onClick={()=>history.push("/")}></img> 
                </section>
                <section className="section-two">
                    <PageNavigator mart={mart} className="desktop-only"></PageNavigator> {/* is going to hanlde responsive from inside */}
                    <ToggleButton onClick={toggleMenu}></ToggleButton>
                </section>
        
            </div>
        </header>
    )
}