import React, { useEffect, useState } from 'react'
import './style.css'
import ListViewBottom from './ListViewBottom'
import ListViewContent from './ListViewContent'
export default ({group, onClick, singleView}) =>{


    return (

        <div className={`order-group-list-view`} >
            <ListViewContent group={group} onClick={onClick}></ListViewContent>
         {/*    <ListViewBottom group={group}></ListViewBottom> */}
        </div>
      
    )
}