import React, { useEffect, useState } from 'react';
import './style.css'
import { withRouter } from 'react-router-dom'
import AdminCommonToolBar from '../../../../../layouts/Admin/AdminCommonToolBar';
import LoadingComp from '../../../../../utils/LoadingComp';
import { listBrandsService } from '../../../../../../services/brand-service'
import Item from './Item'
export default withRouter(({history, value, onClick, onSelection}) =>{
    const [ loading, setLoading ] = useState(false)
    const [ brands, setBrands ] = useState([])
    useEffect(()=>{
        if(brands.length == 0 ){
          loadHandler()
        }
    },[])
    const loadHandler = async () =>{
        setLoading(true)
        try{
            const result = await listBrandsService()
            setBrands(result)
        }catch(err){console.log(err)}
        setLoading(false)
    }
    return ( 
        <React.Fragment> 
       
            { loading === true  ? <LoadingComp></LoadingComp> :
                <React.Fragment>
                   
                    <div className="brands-flow">
                        {
                            brands.length == 0 ? <span> Nenhuma Marca encontrada</span> :
                            brands.map((b,i)=>{
                                return  (<Item 
                                            selected={(value?.value ===  b.id) ? true : false}
                                            key={i} 
                                            brand={b} 
                                            onEdit={()=>onClick(true, b)} 
                                            onSelection={()=>onSelection(b)}></Item>)
                            })
                        }
                    </div>
         
                   
                </React.Fragment>
            }
        </React.Fragment>
    )
})

