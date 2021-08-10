import React from 'react'

import { IoMdArrowDropleft } from 'react-icons/io'
export const CategoyItemView = ({entry}) => {

    const { name, bread_crumbs } = entry

    return (<span className="screw-item-view">
        
        <span className="font-bold  ">
            cat {name}
        </span>

        {bread_crumbs?.length > 0 && bread_crumbs.map((b,i)=>(
            <span key={i} className="smaller muted" style={{padding:2} }><IoMdArrowDropleft></IoMdArrowDropleft> {b}</span> 
        ))}
    </span>)
}

export const BrandItemView = ({entry}) => {

    const { name } = entry

    return (<span className="screw-item-view">
        
        <span className="font-bold  ">
            {name}
        </span>


    </span>)
}