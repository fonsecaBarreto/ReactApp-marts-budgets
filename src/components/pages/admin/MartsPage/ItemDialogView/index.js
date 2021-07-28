import React, { useState } from 'react'
import './style.css'
import Dialog from '../../../../utils/Dialog'
import { joinService } from '../../../../../services/mart-service'
import WarningDialog, { WarningState } from '../../../../../components/utils/WarningDialog'
import { AiFillShop, AiOutlinePaperClip } from 'react-icons/ai'
import { getFilePath } from '../../../../../services/utils-service'

export default ({ mart, setMart, updateMart}) => {

    const warningState = WarningState()
    const [ sending, setSending ] = useState(false)
    const { name, email, phone, cnpj_cpf, isActive, annex } = mart

    const join  = async () =>{
        setSending(true)
        try{
            const result = await joinService(mart.id)
            warningState.showSuccess("Novo estabelecimento adicionado com sucesso!", `'${mart.email}' recebera um email automatico com a senha de acesso.`, "...",() =>{
                updateMart(result)
                setMart(null)
            })
          
        }catch(err){ 
            warningState.showFailure(err.message)
        }
        setSending(false)
    }
    return (
        <React.Fragment>

            <Dialog show={mart} onClose={() => setMart(null)} title="" loading={sending} icon={<AiFillShop/>}>
                <div className={`mart-item-dialog-view`}>

                    <div className={`midv-content`}>

                            <span className="midv-info">
                                Nome: <span className={'font-bold '}> {name} </span>  
                            </span>
                                
                            <span className="midv-info">
                                E-mail: <span className={'font-bold'}> {email} </span>  
                            </span>
            
                            <span className="midv-info">
                                Telefone: <span className={'font-bold'}> {phone} </span>  
                            </span>

                            <span className="midv-info">
                            Cnpj/cpf: <span className={'font-bold'}> {cnpj_cpf} </span>  
                            </span>

                            { annex && 
                                <a href={getFilePath(annex)} target='_blank' className="mart-item-info">
                                    <span className={'font-bold '}>  <AiOutlinePaperClip></AiOutlinePaperClip> 
                                        Anexo 
                                    </span> 
                                </a>
                            }

                    </div>

                {  isActive === false && <div className={`midv-status`}>
            
                        <button className="midv-success-btn" onClick={join}>Aceitar</button>
                        <button className="midv-warning-btn ">Deletar</button>
                    </div>}
                </div>

            </Dialog>

            <WarningDialog config={warningState.dialogconfig} onClose={warningState.closeDialog}></WarningDialog>
        </React.Fragment>
    )
}