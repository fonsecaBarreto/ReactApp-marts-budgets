import React from 'react'
import './style.css'
import MainContentLeftSide from './MainContentLeftSide'
import MainContentRightSide from './MainContentRightSide'
import { AiFillStar} from 'react-icons/ai'

export default () =>{
    return (
        <main id="main-content" className="app-container">
            <section>
                <h2>UNA-se ao jogo dos grandes </h2>
                <h3> Cadastre-se Gratuitamente</h3>
            </section>
            <section>
                <MainContentLeftSide></MainContentLeftSide>
            </section>

            <section>
                <MainContentRightSide></MainContentRightSide>
            </section>
        </main>
    )
}