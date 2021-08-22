import React, { useEffect, useState } from 'react'
import './style.css'

export default ({ pageStruct, pageIndex }) =>{
    const [ progress, setProgres ] = useState(0)

    useEffect(()=> {
        let indice = pageIndex 
        let pages = pageStruct.length -1 //React.Children.toArray(children).length
        let progress = indice / pages * 100
        setProgres(progress)
    },[pageIndex, pageStruct])

    return   (
        <div className="carousel-frame-container">

            <div className="carousel-frame-progress">
                <div className="carousel-frame-progress-inner" style={{'width':progress + "%"}}></div>
            {
                pageStruct.map((tag,i)=>(
                    <div key={i} style={{'left': i   / ( pageStruct.length  - 1 ) * 100 + "%" }} className={`carousel-frame-progress-tag ${ (pageIndex >= i ) ?  'select' : ''}`}>
                        <span> { pageStruct[i].title } </span> 
                        </div>      
                    ))
                    
                } 
            </div>
        </div>
    )
}