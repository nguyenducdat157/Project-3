import React from 'react';
import './InfoSection.css';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';

const InfoSection = () => {
  const infoUser = useSelector((state) => state.auth.user.data.data);
  return (
    <div>
      <div className="info__container">
        <Avatar src={infoUser.avatar} className="info__image" />
        <div className="info_content">
          <a style={{ color: 'blue' }} href="http://localhost:3000/profile">
            <div className="info_username">{infoUser.userName}</div>
          </a>
          <div className="info_description">{infoUser.fullName}</div>
        </div>
        <div className="button__switch__account">Chuyển</div>
      </div>
    </div>
  );
};

export default InfoSection;
