
import './style.css'
export default  ({children, label, error, className}) => {
    return (
    <div className={`alt-form-row ${className} ${error ? "warning" : ''}`}>
        <label>{label}</label>
        {children}
        {error && 
        <span className="form-error">
            {error}
        </span>
        }
    </div>)
}