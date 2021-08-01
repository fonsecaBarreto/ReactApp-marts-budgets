import React from "react"
import './style.css'
import { BsSearch } from 'react-icons/bs'
import { withRouter } from  'react-router-dom'

export default withRouter( ({ history, text, setText, children, label, toSearch}) => {

    const handleInput = (e) => {
        return setText(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            toSearch()
        }
    }

    return (
        <div className="admin-control-bar app-container">
            <div className="admin-cb-filter-row">
                {children}
                <input onKeyDown={handleKeyDown} style={{paddingLeft: 10}} value={text} className="admin-control-bar-search" onInput={handleInput} placeholder={label || ''}></input>
                <button onClick={toSearch} className="admin-cb-searchbutton"> <BsSearch></BsSearch> Search </button>
            </div>
        </div>
    )
})