import React from 'react'
import './style.css'


const main_text = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rut efficitur vel, tempor eu neque. Donec eu euismod diam. Ut eu nulla euismod, fringilla turpis ut, blandit nibh. Ut a suscipit felis. Phasellus rutrum faucibus orci, ullamcorper tempor lectus aliquam nec. Nullam congue lacus eget mi euismod, vitae aliquam purus pulvinar. Nam eget purus ex. Vestibulum ac egestas dui, ac scelerisque odio. `
export default () =>{
    return (
        <div className="become-member home-section">

            <h1> Torne-se um membro</h1>
            <div className="become-member-grid">
                <p> {main_text}</p>
                <p> {main_text}</p>
                <p> {main_text}</p>
                <p> {main_text}</p>

                <div>

                </div>
            </div>
        </div>
    )
}