import { useState, useEffect, useRef, useCallback } from "react"
export function useOutsideAlerter(ref, cb) {
    useEffect(() => {

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) { cb() } 
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); 
    
    };
    }, [ref]);
}
/* 
export function useIntersectionAlerter(cb){

    const observer = useRef()

    const intersectionRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
                cb()
               /*  if(feed.data.length < feed.subTotal) return loadFeed(feed.data.length, true) */
/*             }})
            if (node) observer.current.observe(node)
        }, [])

    return { intersectionRef }
}  */