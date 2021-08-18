import React from "react"
import './style.css'
import { BsSearch } from 'react-icons/bs'
import { withRouter } from  'react-router-dom'
import { IoIosAddCircle } from 'react-icons/io'
export default withRouter( ({ toSearch, text, onText, label, onAdd, children}) => {

    const handleInput = (e) => {
        return onText(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            toSearch()
        }
    } 

    return (
        <div className="app-feed-tool-bar">
            <div className={`aftb-grid`}>
                <button className="aftb-add-button" onClick={onAdd}>   <IoIosAddCircle></IoIosAddCircle>  Novo </button>

                <div>


                    { children && children}

                
                    <input className="aftb-search-bar" onKeyDown={handleKeyDown} style={{paddingLeft: 10}} value={text} onInput={handleInput} placeholder={label || ''}></input> 
                    <button className="aftb-search-btn desktop-only" onClick={toSearch} > <BsSearch></BsSearch> 
                        <span className="desktop-only"> Buscar </span>
                    </button>
                </div>
             
            </div>
        </div>
    )
})