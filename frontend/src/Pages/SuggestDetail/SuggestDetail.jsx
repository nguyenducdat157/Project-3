import React from 'react';
import Grid from '@material-ui/core/Grid';
import './SuggestDetail.css';
import { Avatar } from '@material-ui/core';
import NavBar from '../../Components/NavBar/Navbar';

const SuggestDetail = () => {
  const listSuggest = [
    {
      userName: 'hieu',
      fullName: 'pch',
      followers: 5,
    },
    {
      userName: 'hieu',
      fullName: 'pch',
      followers: 5,
    },
    {
      userName: 'hieu',
      fullName: 'pch',
      followers: 5,
    },
  ];
  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className="suggest">Gợi ý</div>
          <div className="list-data">
            {listSuggest.map((item) => (
              <div className="element">
                <div className="data">
                  <Avatar
                    src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-1/p160x160/150231484_2971872586416946_1647504890189216182_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=7206a8&_nc_ohc=Nzna_K9JHqEAX8CpAag&_nc_ht=scontent-sin6-4.xx&oh=ea9d947c778d26aa164b1092b059951c&oe=61AB6A5F"
                    className="suggestions__image"
                  />
                  <div className="info">
                    <div className="user-name">{item.userName}</div>
                    <div className="full-name">{item.fullName}</div>
                    <div className="followers">co {item.followers} nguoi theo doi</div>
                  </div>
                </div>
                <button>Theo dõi</button>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};

export default SuggestDetail;
