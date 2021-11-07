import React from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import './Profile.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiGrid-grid-xs-6': {},
  },
}));

const Profile = () => {
  const classes = useStyles();
  const infoUser = useSelector((state) => state.auth.user.data.data);
  console.log('infoUser', infoUser);
  return (
    <>
      <NavBar />
      <Grid container classes={{ root: classes.root }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="profile-header">
            <img style={{ height: '150px' }} className="profile-avatar" src={infoUser.avatar} alt="element"></img>
            <div className="profile-info">
              <div className="profile-title">
                <div className="profile-user-name">{infoUser.userName}</div>
                <button onClick={() => console.log('hieu')}>Chỉnh sửa trang cá nhân</button>
              </div>
              <div className="profile-info-detail">
                <div className="profile-post">2 bài viết</div>
                <div className="profile-followers">14 nguoi theo doi</div>
                <div className="profile-following">Dang theo doi 48 nguoi dung</div>
              </div>
              <div className="profile-full-name">{infoUser.fullName}</div>
            </div>
          </div>
          <div className="profile-body"></div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
};

export default Profile;
