import './style.css'
import {ImStarEmpty,  ImStarHalf, ImStarFull} from 'react-icons/im'
export default ({grade, setGrade}) =>{
    const handleClick = (index) =>{
        setGrade(index)
    }
    return(
        <div className="star-rating-pool">
        
            {  [1,2,3,4,5].map((j,i)=>{
                return ( <span className="star-rating-item" onClick={()=>handleClick(i+1)}>
                   { grade >= i+1 ? <ImStarFull> </ImStarFull> : <ImStarEmpty></ImStarEmpty>}
                </span>)
            })
              
            }
        </div>
    )
}