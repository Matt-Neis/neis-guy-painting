import React from 'react';
import '../../Client/CSS/Toolbar.css';
import {Link} from "react-router-dom";
import DrawerToggleButton from '../../Components/SideDrawer/DrawerToggleButton';

const toolbar = props => ( // () can be used instead of {}
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="toolbar-toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar_logo">
                <a href="/home">NEIS GUY PAINTING, LLC</a>
                <center>& Home Handyman Services</center>
            </div>
            <div className="spacer"/>
            <div className="toolbar_navigation-items">
                <ul> {/* unordered list */}
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/services">Services</Link>
                    </li>
                    <li>
                    <   Link to="/photos">Photos</Link>
                    </li>
                    <li>
                        <Link to="/quotes">Request A Quote</Link>
                    </li>
                    <li>
                        <Link to="/testimonials">Testimonials</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Me</Link>
                    </li>
                </ul>
            </div>
        </nav>
        {/* Colored bar */}
        <div className="colorbar">
            <span className="colorbar_color1"></span>
            <span className="colorbar_color2"></span>
            <span className="colorbar_color3"></span>
            <span className="colorbar_color4"></span>
        </div>
    </header>
);

export default toolbar;