export default ({children, label}) =>{
    return (
        <div className="budget-row-comp">
            { label && <label>{label}</label>}
            {children}
        </div>
    )
}