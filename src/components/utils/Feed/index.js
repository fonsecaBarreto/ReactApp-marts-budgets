import { useState, useEffect, useRef, useCallback } from "react"
import './style.css'
import ResulInfo from "./ResulInfo"
import LoadingComp from "../../utils/LoadingComp"
import ToolBar from "./SearchBar"

const INITIAL_DATA = {
    total: 0, //Real amount
    subTotal: 0, //queries total
    data: [], // data received,
    queries: {}
}

export const FeedState = (loadFunction, queries) =>{
    const [ feed, setFeed ] = useState({ ...INITIAL_DATA, queries})
    const [ loading, setLoading ] = useState(false)

    const setQueries = (query) => setFeed(prev=>({...prev, queries: { ...prev.queries, ...query } }))

    useEffect(()=>{ loadFeed(0,false) },[ ]) //going to load from offset 0, with no queries

    const loadFeed = ( offset = 0, append=false ) => {
        
        if(append === false) setFeed(prev => ( { ...prev, subTotal: 0, data: [] } ));
        setLoading(true)

        loadFunction({ offset, queries: feed.queries })
        .then(result=>{
            if(append === true) return setFeed( prev => ({ ...result, data: [ ...prev.data, ...result.data ]}))
            return setFeed(result)
        })
        .catch(err=>{console.log(err)})
        .finally(()=>setLoading(false))
    }
    return { feed, setFeed, loading, setLoading, loadFeed, setQueries}
}

export default ({ component: Component, state, children, onClick }) =>{

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
        <div className="app-feed">

            {children}

            <ResulInfo total={ feed.total } count={feed.data.length} subTotal={feed.subTotal} > </ResulInfo>

            <div className={`app-feed-flow`}>
                { feed.data.map((n,i)=>{
                    return <Component key={i} data={n} onClick={onClick}> </Component> 
                })}
            </div> 

            <div ref={lastItemRef}> </div>

            {  loading && <LoadingComp></LoadingComp> }
        </div>
    )
}