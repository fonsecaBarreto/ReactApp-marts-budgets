import React, { useEffect, useState } from 'react'
import './style.css'


import ProgressBar from '../ProgressBar'
export default ({children, title, pageStruct, forceIndex, setForceIndex, loading }) =>{
    const [pageIndex, setPageIndex ] = useState(0)

    useEffect(()=>{
        if(forceIndex === null) return
        console.log("forceIndex",forceIndex)
        setPageIndex(forceIndex)
        setForceIndex(null)
    },[forceIndex])

    const handleNext = async () =>{
        let currentPage = pageStruct[pageIndex]
        var isOk = true
        if (currentPage.beforeNext){
            isOk = await currentPage.beforeNext()
        }
        if(isOk) return setPageIndex(pageIndex + 1)
    }

    return (

        <div className={`login-carousel-frame ${loading? 'loading' : ''}`}>

            <div className="login-carousel-frame-section">
                { title && <h2>{title}</h2>}
                <ProgressBar pageStruct={pageStruct} pageIndex={pageIndex}></ProgressBar> 
            </div>

            <div className="login-carousel-frame-section">
       
                { React.Children.map(children, (x,i) =>{ 
                    if(pageIndex === i ) return <div key={i}> {(x)} </div>
                })}

            </div>


            <div className="login-carousel-frame-section">
           
                {pageStruct[pageIndex]?.hideButtons === true ? <span></span>  :
                    <React.Fragment>

                        { (pageIndex > 0) && <button className="soft-btn login-carousel-btn login-prev-btn" onClick={()=>setPageIndex(pageIndex -1 )}>Anterior</button>}

                        { (pageIndex < React.Children.toArray(children).length - 1) && <button className="soft-btn login-carousel-btn login-next-btn" onClick={handleNext}>
                        { pageStruct[pageIndex]?.nextLabel || 'Proximo'}
                        </button>} 
                        
                    </React.Fragment>
                }


            </div>  
        </div>
    )
}