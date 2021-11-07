import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import './SuggestDetail.css';
import { Avatar } from '@material-ui/core';
import NavBar from '../../Components/NavBar/Navbar';
import { getAllUserSuggest } from '../../redux/user/user.slice';
import { followApi, unFollowApi } from '../../redux/user/user.slice';
import { useDispatch } from 'react-redux';

const SuggestDetail = () => {
  const dispatch = useDispatch();
  const [listSuggest, setListSuggest] = useState([]);

  const SuggestItem = (props) => {
    const [followed, setFollowed] = useState(false);
    const handleFollow = async () => {
      await dispatch(followApi(props.id));
      setFollowed(true);
    };
    const handleUnFollow = async () => {
      await dispatch(unFollowApi(props.id));
      setFollowed(false);
    };
    console.log('key: ', props.id);
    return (
      <div key={props.key} className="element">
        <div className="data">
          <Avatar src={props.avatar} className="suggestions__image" />
          <div className="info">
            <div className="user-name">{props.userName}</div>
            <div className="full-name">{props.fullName}</div>
            <div className="followers">có {props.followers.length} người theo dõi</div>
          </div>
        </div>
        {!followed && (
          <button className="follow" onClick={handleFollow}>
            Theo dõi
          </button>
        )}
        {followed && (
          <button className="followed" onClick={handleUnFollow}>
            Hủy theo dõi
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        url: 'http://localhost:5000/api/user/get-all-suggest',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setListSuggest(response.data.data);
        }
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className="suggest">Gợi ý</div>
          <div className="list-data">
            {listSuggest &&
              listSuggest.length > 0 &&
              listSuggest.map((item, index) => (
                // <div key={item._id} className="element">
                //   <div className="data">
                //     <Avatar src={item.avatar} className="suggestions__image" />
                //     <div className="info">
                //       <div className="user-name">{item.userName}</div>
                //       <div className="full-name">{item.fullName}</div>
                //       <div className="followers">có {item.followers.length} người theo dõi</div>
                //     </div>
                //   </div>
                //   <button>Theo dõi</button>
                // </div>
                <SuggestItem
                  key={index}
                  id={item._id}
                  userName={item.userName}
                  fullName={item.fullName}
                  avatar={item.avatar}
                  followers={item.followers}
                />
              ))}
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};

export default SuggestDetail;
