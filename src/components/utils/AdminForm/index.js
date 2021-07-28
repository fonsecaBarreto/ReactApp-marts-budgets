import React from "react";
import './style.css'

export default function AdminForm({ title, children, columns = [], loading}){

    const classNames = [ "one","two","three","four","five","six" ]
    return (
  
        <div className={`admin-form-container ${loading ? 'load' : ''}`}>
            <div className="admin-form">
                { title && <span className="ad-title">{title || ""}</span>}
    
                <div className="form-grid">
                    { React.Children.map(children, (x,i) =>(<div className={`grid-row ${classNames[columns[i]-1]}`}> {x} </div> ))}
                </div>
            </div>
        </div>
  
    )
}