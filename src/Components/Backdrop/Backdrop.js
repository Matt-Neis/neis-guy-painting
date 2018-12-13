import React from 'react';
import '../../Client/CSS/Backdrop.css'

const backdrop = props => (
    <div className="backdrop" onClick={props.click}/>
);

export default backdrop;