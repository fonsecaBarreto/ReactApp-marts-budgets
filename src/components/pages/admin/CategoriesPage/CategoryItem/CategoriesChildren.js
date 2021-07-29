import { VscDebugStackframeDot } from 'react-icons/vsc'
export default ({category}) =>{
    if(!category) return undefined

    const { name } = category
    return (
        <div className="category-child-item">
            <VscDebugStackframeDot></VscDebugStackframeDot>
            {name}
        </div>
    )
}