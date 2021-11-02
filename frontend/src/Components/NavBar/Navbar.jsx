import React from 'react';
import './Navbar.css';
import insta_log from '../../images/logoinsta.png';
import home from '../../images/home.svg';
import react from '../../images/love.svg';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import pp from '../../images/avt-ins.jpg';
import add from '../../images/add.png';
import reactClick from '../../images/blacklove.png';
// import { useHistory } from "react-router";
const NavBar = () => {
  return (
    <div style={{ zIndex: '999', width: '100%', position: 'fixed' }}>
      <div className="navbar__barContent">
        <Grid container>
          <Grid item xs={2}>
            {' '}
          </Grid>
          <Grid item xs={3}>
            <a href="/">
              {' '}
              <img className="navbar_logo" src={insta_log} alt="element" width="105px" />
            </a>
          </Grid>
          <Grid item xs={3}>
            <input text="text" className="navbar__searchBar" placeholder="Search" />
          </Grid>
          <Grid item xs={3} style={{ display: 'flex' }}>
            <a href="/">
              <img className="navbar__img" src={home} alt="element" width="25px" />
            </a>
            <img
              className="navbar__img"
              src={add}
              alt="element"
              width="25px"
              height="25px"
              style={{ borderRadius: '1px' }}
            />
            {true ? (
              <img className="navbar__img" src={react} alt="element" width="25px" />
            ) : (
              <img className="navbar__img" src={reactClick} alt="element" width="25px" height="25px" />
            )}
            <Avatar src={pp} className="navbar__img" style={{ maxWidth: '25px', maxHeight: '25px' }} />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NavBar;
