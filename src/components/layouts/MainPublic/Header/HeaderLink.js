import React from 'react'
import { withRouter } from 'react-router-dom'
export default withRouter(({history, to, currentPage, children}) =>{
    const goTo = () => {
        history.push(to)
    } 
    return (
        <li className={ `header-link ${currentPage === to? 'active': ''}`} onClick={goTo}> {children} </li>
    )
})