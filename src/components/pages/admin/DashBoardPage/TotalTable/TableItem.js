import React from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'

export default ({image, label, value, to}) =>{
    const history = useHistory()
    const goto = () => { history.push(to) }
    return (
        <div className="metrics-total-table-item" onClick={goto}>
            <section> {image}  </section>
            <section>
                <span>{value}  <span>{`${value == 1 ? label[0] : label[1]}`}</span> </span>
            </section>
        </div>
    )
}