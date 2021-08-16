import React from 'react'
import './style.css'
import SomeImage from '../../../../../assets/camera.png'
import TeamImage from '../../../../../assets/team.svg'
import GoalsImage from '../../../../../assets/goals.svg'
import GroceryImage from '../../../../../assets/groceries.svg'

import VisibilitySensor from 'react-visibility-sensor'
const ROW_STRUCT = [
    {
        image:TeamImage,
        title: "O que fazemos?",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum velit in volutpat viverra. Suspendisse pulvinar nibh vitae est dictum congue. "
    },
    {
        image:GoalsImage,
        title: "Objetivos",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum velit in volutpat viverra. Suspendisse pulvinar nibh vitae est dictum congue. "
    },
    {
        image:GroceryImage,
        title: "Publico alvo.",
        description: "Lorem ipsum dolor sit amet,  Suspendisse pulvinar nibh vitae est dictum congue. consectetur adipiscing elit. Vivamus rutrum velit in volutpat viverra. Suspendisse pulvinar nibh vitae est dictum congue. "
    },
]

export default () =>{
    return (
        <div className="perks-row home-section">
            {
                ROW_STRUCT.map( (col, i)=>(
                    <div className="perks-card" key={i}>
                        <div className="pcimg-vp">
                            <img src={col.image}></img>
                        </div>
                        <span>{col.title}</span>
                        <span>{col.description}</span>
                    </div>
                ))
            }
        </div>
    )
}