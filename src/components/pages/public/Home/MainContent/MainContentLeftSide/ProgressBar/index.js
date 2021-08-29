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
            <div className="cfc-progress-bar-container">
                <div className="cfc-progress-bar">
                    <div className="carousel-frame-progress-inner" style={{'width':progress + "%"}}></div>
                </div>
                <div className="cfc-progress-bar-aux">
                {
                    pageStruct.map((tag,i)=>(
                        <div key={i} className="cfc-aux-tag" style={{'left': i   / ( pageStruct.length  - 1 ) * 100 + "%" }} >
                            <div  className={`cfc-aux-tag-pointer" ${ (pageIndex >= i ) ?  'select' : ''}`}> </div>      
                            <span className="cfpi-label-tag"> { pageStruct[i].title } </span>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}