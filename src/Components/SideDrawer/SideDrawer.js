import React from 'react';
import {Link} from 'react-router-dom';
import '../../Client/CSS/SideDrawer.css'

const sideDrawer = props => {
    let drawerClasses = ['side-drawer'];

    if (props.show)
    {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                    <Link to="/photos">Photos</Link>
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
        </nav>
    );
};

export default sideDrawer;