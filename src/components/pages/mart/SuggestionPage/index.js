import React, { useEffect, useState } from "react"
import './style.css'

import HeaderSection from "./HeaderSection"
import BottomSection from "./BottomSection"
import ContentSection from "./ContentSection"
import { SuggestionFormState } from './SuggestionForm'
import { useSelector } from 'react-redux'

export default () =>{
    const { mart } = useSelector(state => state.global)
    const state  = SuggestionFormState()
    return (
        <div id="suggestion-page">
            <div className=" suggestion-page-container app-container">
                <HeaderSection mart={mart}></HeaderSection>
                <ContentSection  mart={mart} state={state}></ContentSection>
                <BottomSection state={state}></BottomSection>
            </div>
        </div>
    )
}