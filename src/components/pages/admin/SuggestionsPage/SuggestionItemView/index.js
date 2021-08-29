import './style.css'
import UserImage from '../../../../../assets/user.webp'
export default ({suggestion}) =>{

    const { items, mart, created_at } = suggestion

    return (
        <div className="suggestion-private-item-view">

            <section>
                <img src={UserImage}></img>
              
                <span> { mart?.label} </span>
                <span className="small muted"> {new Date(created_at).toDateString()} </span>
               
            </section>

            <section>
                <ul>  { 
                    ( items && items.length > 0 ) && items.map( (j,i) =>{
                        
                        return (<li> 
                            <span className="font-bold"> {j.quantity}x </span>
                            {j.description}
                        </li>)

                    })    

                }</ul>
                </section>

           
        </div>
    )
}