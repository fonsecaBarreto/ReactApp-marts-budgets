export default ({total, count, subTotal}) => {
    return (
        <div className="result-info-bar">
            <span> Total:  <span className="font-bold">  {total}</span>
            </span>  - <span>  <span className="font-bold"> {count}/{subTotal} </span> resultados </span>
        </div>
    )
}