import './style.css'
import UserImage from '../../../../../assets/user.webp'
import { IoMdStarHalf,IoMdStar} from 'react-icons/io'
export default ({rating}) =>{

    const { grade, description, mart, created_at } = rating

    return (
        <div className="rating-private-item-view">

            <section>
                <img src={UserImage}></img>
              
                <span> { mart?.label} </span>
                <span className="small muted"> {new Date(created_at).toDateString()} </span>
               
            </section>

            <section>
                <span>  <IoMdStar></IoMdStar> Avaliação: {grade} </span>
                <span> - {description} </span>

                </section>

           
        </div>
    )
}