import React from "react";
import './style.css'

export default function AdminForm({ title, children, columns = [], loading, toolbar, created_at, updated_at }){

    const classNames = [ "one","two","three","four","five","six" ]
    return (
  
        <div className={`admin-form-container ${loading ? 'load' : ''}`}>
            <div className="admin-form">
                { title && <span className="ad-title">{title || ""}</span>}
    
                <div className="form-grid">
                    { React.Children.map(children, (x,i) =>(<div className={`grid-row ${classNames[columns[i]-1]}`}> {x} </div> ))}
                </div>

                { toolbar && <div className="admin-form-tool-bar"> { toolbar } </div>}



              {/*   { created_at && <span className="flex-row muted small"> Criado em:
                    <span className="font-bold"> {created_at} </span> </span>}

                { updated_at && <span className="flex-row muted small"> Atualizado em:
                    <span className="font-bold"> {updated_at} </span> </span>} */}
            </div>
        </div>
  
    )
}