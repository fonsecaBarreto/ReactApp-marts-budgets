
import Dialog from '../../../../utils/Dialog'
import React, { useEffect, useState } from 'react';
import './style.css'
import LoadingComp from '../../../../utils/LoadingComp';
import FormRow from '../../../../utils/FormRow';
import BrandsListPage from './BrandsListPage/index';
import BrandEditForm from './BrandEditForm'
import AdminCommonToolBar from '../../../../layouts/Admin/AdminCommonToolBar';

export default ({ value, show, onClose, onInput}) =>{

    const [ editForm, setEditForm ] = useState({
        initial_data: null,
        show: false
    })

    const handleClick = (show=true, data=null) =>{ //to Edit 
        setEditForm({ show, initial_data: data })
    }  

    const handleFormCancel = (brand) =>{
        setEditForm({ show: false, initial_data: null})
        if(brand){ onInput(brand)}
    }

    return (
         <Dialog title="Marcas" show={show} onClose={() => onClose(null)}>
            <div className="brand-edit-modal">
                <div className="bem-header flex-row">
                    { editForm.show == true  && <button onClick={()=>handleClick(false, null)}> Voltar </button> }
                    { editForm.show == false && <button onClick={()=>handleClick(true, null)} >Novo </button> }
       
                </div>

        
               
                    
                {
                    editForm.show == true ?
                        <BrandEditForm
                            initial_data={editForm.initial_data}
                            onCancel={handleFormCancel}
                        ></BrandEditForm>
                    :
                    <React.Fragment>

                        <div className="brand-edit-modal-tool-bar">
                            <input disabled type="text" value={value ? value.label : ""}></input>
                            <button onClick={onClose}> Feito </button>
                        </div> 

                        <BrandsListPage value={value} onClick={handleClick} onSelection={onInput}></BrandsListPage>
                      
                      
                    </React.Fragment>
                }
            </div>
        </Dialog>
    )
}

