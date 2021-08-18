
import { AiFillShop, AiFillDashboard, AiOutlineUnorderedList, AiFillPlusCircle} from 'react-icons/ai'
import { FaTruck } from 'react-icons/fa'

import { BiPackage} from 'react-icons/bi'
import { CgNotes } from 'react-icons/cg'
import { RiPriceTag2Fill } from 'react-icons/ri'

export const MENU_STRUCT = [

    {
        title: "Painel", to: "/admins/panel",
        icon: <AiFillDashboard></AiFillDashboard>,
    },

    {
        title: "Orçamentos",   to: "/admins/budgets",
        icon: <CgNotes></CgNotes>,
        back: "/admins/panel",
    },
   
    {
        title: "Produtos",
        icon: <BiPackage></BiPackage>,
        subs: [
            {
                title: "Listagem",  to: "/admins/products",
                icon: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
                back: "/admins/panel",
            },
          
            {
                title: "Categorias", to: "/admins/categories",
                icon: <RiPriceTag2Fill></RiPriceTag2Fill>,
                back: "/admins/products",
            },
            {
                title: "Adicionar Categoria", to: "/admins/categories/create",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/categories",
                hide: true

            },
            {
                title: "Editar Categoria", to: "/admins/categories/update",
                icon: <RiPriceTag2Fill></RiPriceTag2Fill>,
                back: "/admins/categories",
                hide: true
            },
            {
                title: "Adicionar Item", to: "/admins/items/create",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/products",

            },
            {
                title: "Editar Item", to: "/admins/items/update",
                icon: <RiPriceTag2Fill></RiPriceTag2Fill>,
                back: "/admins/products",
                hide: true
            },

            {
                title: "Adicionar Produto",  to: "/admins/products/create",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/products",
            },
            {
                title: "Editar",  to: "/admins/products/update",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/products",
                hide: true
            },
        ]
    },
    {
        title: "Estabelecimentos",
        icon: <AiFillShop></AiFillShop>,
    
        subs: [
            {
                title: "Listagem",  to: "/admins/marts",
                icon: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
                back: "/admins/panel",
            },
            {
                title: "Adicionar",  to: "/admins/marts/create",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/marts",
        
            },
            {
                title: "Editar",  to: "/admins/marts/update",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/marts",
                hide: true
            },
        ]
    },
    {
        title: "Fornecedores",
        icon: <FaTruck></FaTruck>,
        subs: [
            {
                title: "Listagem",  to: "/admins/providers",
                icon: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
                back: "/admins/panel",
            },
            {
                title: "Adicionar",  to: "/admins/providers/create",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/providers",
     
            },
            {
                title: "Editar",  to: "/admins/providers/update",
                icon: <AiFillPlusCircle></AiFillPlusCircle>,
                back: "/admins/providers",
                hide: true
            },
        ]
    }
]

