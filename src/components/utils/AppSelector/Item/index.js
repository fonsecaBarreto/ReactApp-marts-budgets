import React, { useEffect, useState } from "react"
import './style.css'

export default ({data}) => {

    const [ parentName, setParentName] = useState("")

  /*   useEffect(()=>{
        if(!data) return
        var name = ""
        if(data?.bread_crumbs.length > 0 ) data.bread_crumbs.forEach(parentName => {
            name += parentName
        });

        setParentName(name)

    },[data]) */

    const { label, value  } = data
    return (
    <span className="app-custom-selector-item" >
       
        <span className="font-bold">{label}</span>
     {/*    <span className="muted">{parentName}</span> */}

    </span>
    )

}