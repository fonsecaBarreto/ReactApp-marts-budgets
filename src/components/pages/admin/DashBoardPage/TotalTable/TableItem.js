import React from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'

export default ({image, label, value, to}) =>{

    const history = useHistory()

    const goto = () =>{
        history.push(to)
    }

    return (
        <div className="metrics-total-table-item" onClick={goto}>
            
            <section>
                {image}
           {/*      <img src={image}></img> */}
            </section>
            <section>

                <span>{value}  <span>{label}</span> </span>
               
            </section>
        </div>
    )
}