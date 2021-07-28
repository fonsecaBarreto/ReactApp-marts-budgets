import React, { useState } from 'react'
import './style.css'
import MenuItem from './MenuItem'
import { AiFillShop, AiTwotoneShopping, AiFillDashboard} from 'react-icons/ai'
import { FaArchive, FaTruck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import Logo from '../../../../assets/logo.jpg'


export default ({show, onItemClick}) =>{

    const [ currentPage, setCurrentPage ] = useState('/admins/dashboard')
    const handleClick = (to) =>{
        setCurrentPage(to)
        onItemClick()
    }
    return (<aside className={`admin-menu ${show ? 'show' : ''}`}>
        <nav>
            <img className="adm-layout-menu-logo desktop-only" src={Logo}></img>
            <ul>
                <MenuItem selected={currentPage === "/admins/dashboard"} to="/admins/dashboard" 
                    emitClick={handleClick} icon={<AiFillDashboard></AiFillDashboard>} > Relatorios  </MenuItem>

                <MenuItem selected={currentPage === "/admins/marts"} to="/admins/marts"
                    emitClick={handleClick} icon={<AiFillShop></AiFillShop>}  > Mercados </MenuItem>

                <MenuItem selected={currentPage === "/admins/products"} to="/admins/products" 
                    emitClick={handleClick} icon={<AiTwotoneShopping></AiTwotoneShopping>}> Produtos  </MenuItem>

                <MenuItem selected={currentPage === "/admins/providers"} to="/admins/dashboard" 
                    emitClick={handleClick} icon={<FaTruck></FaTruck>}> Fornecedores  </MenuItem>

                <MenuItem selected={currentPage === "/admins/budgets"} to="/admins/dashboard" 
                    emitClick={handleClick} icon={<CgNotes></CgNotes>}> Orçamentos  </MenuItem>

                <MenuItem emitClick={handleClick} to="/inicio"> Sair </MenuItem>
            </ul>
        </nav>
 
    </aside>)
}