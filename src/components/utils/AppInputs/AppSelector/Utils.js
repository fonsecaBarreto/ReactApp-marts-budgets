import { useEffect, useState, useRef } from "react"
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


export function useCounter (state){
    const [count, setCount] = useState(0)
    const interval = useRef(null) 

    useEffect(() => { if (count >= 1) {  
        clearInterval(interval.current); setCount(0)
         state.handleOnLoad(0,true); 
    }}, [count]) 

    const startToCount = (e) => {
        var timeOut = 200
        if(e.key === "Backspace" && state.text.length > 0) timeOut = 600 ;
        clearInterval(interval.current); setCount(0)
        interval.current = setInterval(() => {
            setCount(prevState => prevState + 1)
        }, timeOut) 
    }

    return { startToCount }
}

