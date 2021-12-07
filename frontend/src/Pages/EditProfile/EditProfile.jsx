import React from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import Grid from '@material-ui/core/Grid';

const EditProfile = () => {
  return (
    <>
      <NavBar />

      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className="edit_box_data">
            <div className="edit_header"></div>
            <div className="edit_content"></div>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
