import React, { useEffect, useState } from 'react'
import './style.css'

import ListViewContent from './DialogViewContent'
export default ({group, onClick, singleView}) =>{


    return (

        <div className={`order-group-dialog-view`} >
            <ListViewContent group={group} onClick={onClick}></ListViewContent>

        </div>
      
    )
}