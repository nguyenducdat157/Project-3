import React from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import Grid from '@material-ui/core/Grid';
import './Inbox.css';

const Inbox = (props) => {
  return (
    <>
      <NavBar />

      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className="box_data">
            <div className="header"></div>
            <div className="content"></div>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};

export default Inbox;
