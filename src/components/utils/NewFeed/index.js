import { useState, useEffect, useRef, useCallback } from "react"
import './style.css'
import LoadingComp from "../../utils/LoadingComp"

const INITIAL_DATA = {
    total: 0,
    subTotal: 0, 
    data: []
}

export const NewFeedState = (loadFunction) =>{
    const [ feed, setFeed ] = useState({ ...INITIAL_DATA })
    const [ loading, setLoading ] = useState(false)
    useEffect(()=>{ loadFeed(0,false) },[ ]) 
    const loadFeed = ( offset = 0, append=false ) => {
        if(append === false) setFeed(prev => ( { ...prev, subTotal: 0, data: [] } ));
        setLoading(true)
        loadFunction({ offset })
        .then(result=>{
            if(append === true) return setFeed( prev => ({ ...result, data: [ ...prev.data, ...result.data ]}))
            return setFeed(result)
        })
        .catch(err=>{console.log(err)})
        .finally(()=>setLoading(false))
    }
    return { feed, setFeed, loading, setLoading, loadFeed }
}

export const NewFeedPool = ({component: Component, state, onItemClick}) =>{
    const { feed, setFeed, loading, loadFeed } = state
    const observer = useRef()

    const lastItemRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
                if(feed.data.length < feed.subTotal) return loadFeed(feed.data.length, true)
        }})
        if (node) observer.current.observe(node)

    }, [loading, feed, feed.data, feed.subTotal])


    return (

        <div className={`app-new-feed`}>
        
            <div className={`app-new-feed-flow`}>
                { feed.data.map((n,i)=>{
                    return <Component key={i} data={n} onClick={onItemClick}> </Component> 
                })}
                <div ref={lastItemRef}> </div>
            </div> 

            {  loading && <LoadingComp></LoadingComp> }

        </div>
  
    )

  
}
