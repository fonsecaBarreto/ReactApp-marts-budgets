import React from "react";
import './style.css'

export default ({ children, columns = [] }) => {

    const classNames = [ "c1","c2","c3","c4","c5","c6" ]
    return (
  
        <div className={`new-login-form-grid`}>
            { React.Children.map(children, (x,i) =>(<div className={`grid-row ${classNames[columns[i]-1]}`}> {x} </div> ))}
        </div>
  
    )
}