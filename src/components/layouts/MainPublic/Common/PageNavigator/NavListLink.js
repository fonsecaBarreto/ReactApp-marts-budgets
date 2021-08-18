import React from 'react'
import { useHistory } from 'react-router-dom'
export default ({to, label, selected}) =>{

    const history = useHistory()
    const goTo = () => {
        history.push(to)
    } 
    return (
        <li className={ `nav-list-link ${selected? 'active': ''}`} onClick={goTo}> {label} </li>
    )
}