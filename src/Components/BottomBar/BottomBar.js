import React from 'react';
import '../../Client/CSS/BottomBar.css';

const bottomBar = props => (
    <header className="bottom-bar">
        <ul className="bottom-bar-items">
            <center>
                {/* list because there might be stuff added to the bottom bar */}
                <li>&#169;Neis Guy Painting, LLC</li>
            </center>
            <li>
                ksdk
            </li>
        </ul>
        <ul className="bottom-bar-items">
            <li>
                kskdk
            </li>
        </ul>
    </header>
);

export default bottomBar;