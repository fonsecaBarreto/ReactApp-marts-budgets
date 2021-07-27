import React from 'react'
import './style.css'
import MenuItem from './MenuItem'
import { AiFillShop, AiTwotoneShopping, AiFillDashboard} from 'react-icons/ai'
import { FaArchive, FaTruck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import Logo from '../../../../assets/logo.jpg'


export default ({show}) =>{
    return (<aside className={`admin-menu ${show ? 'show' : ''}`}>
        <nav>
            <img className="adm-layout-menu-logo desktop-only" src={Logo}></img>
            <ul>
                <MenuItem icon={<AiFillDashboard></AiFillDashboard>} to="/admins/dashboard"> Relatorios  </MenuItem>
                <MenuItem icon={<AiFillShop></AiFillShop>}  to="/admins/marts"> Mercados </MenuItem>
                <MenuItem icon={<AiTwotoneShopping></AiTwotoneShopping>}> Produtos  </MenuItem>
                <MenuItem icon={<FaTruck></FaTruck>}> Fornecedores  </MenuItem>
                <MenuItem icon={<CgNotes></CgNotes>}> Orçamentos  </MenuItem>
                <MenuItem to="/inicio"> Sair </MenuItem>
            </ul>
        </nav>
 
    </aside>)
}