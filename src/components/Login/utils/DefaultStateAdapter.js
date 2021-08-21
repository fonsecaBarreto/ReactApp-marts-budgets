import React, { useEffect, useState } from "react"
export default (initial_data) =>{
 
    const [ data, setData ] = useState({ ...initial_data })
    const [ errors, setErrors ]= useState({})
    const [ loading, setLoading ] = useState(false)
    const handleInputs = (key,value) => setData(prev => ({  ...prev,  [key]:value  }))
    const clearAll = () =>{ 
        setData({ ...initial_data }); 
        setErrors({})
    }

    return {
        inputsState: { data, setData, handleInputs },
        errorsState: { errors, setErrors },
        loadingState: { loading, setLoading },
        clearAll
    }
 
}