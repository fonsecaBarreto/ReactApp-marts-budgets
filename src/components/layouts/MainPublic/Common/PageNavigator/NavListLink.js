import React from 'react'
import { useHistory } from 'react-router-dom'
export default ({to, hash, label, selected}) =>{

    const history = useHistory()
    const goTo = () => {
        console.log(to, hash)
        history.push({ pathname: to, hash, state:{isActive: true}})
    } 
    return (
        <li className={ `nav-list-link ${selected? 'active': ''}`} onClick={goTo}> {label} </li>
    )
}