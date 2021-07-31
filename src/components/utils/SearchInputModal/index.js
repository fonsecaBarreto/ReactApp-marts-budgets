import React, { useState } from 'react'
import './style.css'
import Dialog from '../Dialog'
import Treeview from '../TreeView'
import LoadingComp from '../LoadingComp'
import { CgSelect } from 'react-icons/cg'
import AdminForm from '../AdminForm'
import FormRow from '../FormRow'
const TreeComponent = ({data}) =>{
    return (
        <span> {data.name}</span>
    )
}
export default ({ tree, list,  title, value, onInput }) =>{

    const [ show, setShow ] = useState(false)
    const [ selected, setSelected ] = useState(null)

    const selecionar = () =>{
        onInput(selected && selected.id)
        setShow(false)
    }   

    return (
        <React.Fragment>

            <div className="search-input-modal-row">
                <button onClick={()=>setShow(true)} disabled={tree.length > 0 ? false : true}> <CgSelect></CgSelect> </button>
            
                <select disabled value={value || ''} onClick={e=>e.preventDefault()}>
                    {list.map((v,i)=>{
                        return (<option disabled key={i} value={v.value} >{v.label}</option>)
                    })}
                </select> 

            </div>

            <Dialog title={title} show={show} onClose={() => setShow(false)}>
                <div className="search-input-modal-dialog">

                    {
                        !tree ? <LoadingComp></LoadingComp> : 
                        <Treeview component={TreeComponent} useCheckBox={true} tree={tree} onSelected={setSelected} ></Treeview> 
                    }

                    <FormRow label="Categoria selecionada:">

                        <div className="semd-bottom-bar">

                            <input type="text" disabled value={ selected ? selected.name : ''}></input>
                            <button onClick={selecionar} className="select-btn"> Selecionar </button>
                        
                        </div>
                    </FormRow>
                </div>
            </Dialog>
        </React.Fragment>
    )
}