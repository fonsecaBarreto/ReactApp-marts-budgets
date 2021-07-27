
import './style.css'
export default  ({children, label, error, className}) => {
    return (
    <div className={`form-row ${className}`}>
        <label>{label}</label>
        {children}
        {error && 
        <span className="form-error">
            {error}
        </span>
        }
    </div>)
}