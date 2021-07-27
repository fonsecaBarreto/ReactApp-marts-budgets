import { withRouter, Link} from "react-router-dom"
import { useSelector } from 'react-redux'
export default withRouter(({children}) =>{
    const { mart, admin } = useSelector(state => state.global)
    return (<div>
        <div className="flex-column ">
            <span>Mercado: { mart ? mart.name : "[]"}</span>
            <span>Admin: { admin ? admin.username : "[]"}</span>
  
        </div>
        <nav>
            <Link to="/inicio"> Inicio </Link>
            <Link to="/admins/dashboard"> Admin </Link>
            <Link to="/marts/orcamento"> Mercado </Link>
        </nav>

        <nav>
            <Link to="/login"> Login Mercado </Link>
            <Link to="/admins/login"> Admin  Login</Link>
        </nav>

        <div>
            {children}
        </div>
    </div>)
})