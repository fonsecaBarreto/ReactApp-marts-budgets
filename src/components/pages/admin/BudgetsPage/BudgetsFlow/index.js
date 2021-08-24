import React, { useState } from 'react'
import './style.css'
import OrdersGroupListview from './OrdersGroupListview'
import OrderGroupDialog from './OrderGroupDialog'
export default ({ordersgroups}) =>{
    const [ selectedGroup, setSelectedGroup ] = useState(null)
    
    const handleClick = (group) => {
        setSelectedGroup(group)
    }

    return (

        <React.Fragment>
            <div className="budget-list-flow">
                {
                    ordersgroups.length > 0 && ordersgroups.map((g,i)=>( <OrdersGroupListview key={i} group={g} onClick={handleClick}></OrdersGroupListview> ))
                }
            </div>
            { selectedGroup && <OrderGroupDialog group={selectedGroup} setGroup={setSelectedGroup}></OrderGroupDialog>}
         </React.Fragment>
    )
}