import React from 'react';
import "./InfoSection.css";
import { Avatar } from '@material-ui/core';
import pp from '../../images/avt-ins.jpg';

const InfoSection = () => {
    return ( 
    <div>
        <div className="info__container">
            <Avatar src={pp} className="info__image"/>
            <div className="info_content">
                <div className="info_username"> ducdatchelsea</div>
                <div className="info_description"> Đức Đạt Chelsea</div>
            </div>
            <div className="button__switch__account">Chuyển</div>
        </div>
    </div> );
}
    
    
export default InfoSection;