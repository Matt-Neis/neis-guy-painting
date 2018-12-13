import React from 'react';
import '../Client/CSS/Services.css'

class Services extends React.Component {
    render() {
        return (
            <div>
                <h1 className="services-header">Services</h1>
                <ul className="services-items">
                    <li>Deck Staining and Sealing</li>
                    <li>Exterior Painting</li>
                    <li>Exterior Whole Home Painting</li>
                    <li>Faux Painting</li>
                    <li>Fence and Outdoor Structure Painting</li>
                    <li>Interior Feature Painting</li>
                    <li>Interior Spaces Painting - 1-2 Rooms</li>
                    <li>Interior Spaces Painting - 3-4 Rooms</li>
                    <li>Interior Spaces Painting - 5+ Rooms</li>
                    <li>Painting</li>
                    <li>Small Painting Projects</li>
                    <li>Texture Painting</li>
                    <li>Walpapering/Removal</li>
                </ul>
            </div>
        );
    }
}

export default Services;