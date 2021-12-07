/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../Components/NavBar/Navbar';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import './Profile.css';
import { makeStyles } from '@material-ui/core/styles';
import Popup from '../../Components/Popup/Popup';
import { getFollowers, getFollowing } from '../../redux/user/user.slice';
import { followApi, unFollowApi } from '../../redux/user/user.slice';
import { getPostMe } from '../../redux/post/post.slice';
import love from '../../images/love.svg';
import comment from '../../images/comment.svg';
import { getProfileFriend } from '../../redux/user/user.slice';
import { useHistory } from 'react-router';
const useStyles = makeStyles(() => ({
  root: {
    '& .MuiGrid-grid-xs-6': {},
    '@media (max-width: 735px)': {
      marginLeft: '-140px',
      minWidth: '500px',
    },
  },
  popup_follower: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 20px 0 20px',
    '& .pop_btn': {
      marginLeft: '100px',
      height: '30px',
      fontWeight: 600,
      marginTop: '6px',
    },
    '& .pop_name': {
      marginLeft: '10px',
      '& .pop_fullName': {
        fontWeight: 600,
      },
    },
  },
}));

const ProfileFriend = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const infoUser = useSelector((state) => state.auth.user.data.data);
  const listFollower = useSelector((state) => state?.user?.followers?.data?.data);
  const listFollowing = useSelector((state) => state?.user?.following?.data?.data);
  const listPostForMe = useSelector((state) => state.post.postOfMe.data);
  const infoFriend = useSelector((state) => state.user.profileFriend.data.data);
  const history = useHistory();

  const ShowPicture = (props) => {
    const [hoverPicture, setHoverPicture] = useState(false);
    return (
      <>
        <div className="profile_picture_container">
          <img
            onMouseOver={() => {
              setHoverPicture(true);
            }}
            onMouseOut={() => {
              setHoverPicture(false);
            }}
            className="profile_picture"
            style={{ width: '400px', height: '300px', marginRight: '20px' }}
            src={'http://localhost:5000/public/' + props.picture}
          ></img>
          {hoverPicture && (
            <div style={{ display: 'flex' }} className="profile_icon_in_picture">
              <span style={{ display: 'flex', marginRight: '20px' }}>
                <img className="profile_love" src={love}></img>
                <span style={{ color: 'red', fontWeight: 'bold' }}>{props.likes}</span>
              </span>
              <span style={{ display: 'flex' }}>
                <img className="profile_commnet" src={comment}></img>
                <span style={{ color: 'red', fontWeight: 'bold' }}>{props.comments}</span>
              </span>
            </div>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    dispatch(getFollowers());
    dispatch(getFollowing());
    dispatch(getPostMe());
    dispatch(getProfileFriend(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FollowerItem = (props) => {
    const [followed, setFollowed] = useState(false);
    const checkFollowed = (item) => {
      const listFollowingId = listFollowing.map((item) => item._id);
      return listFollowingId.includes(item._id);
    };
    return (
      <div className={classes.popup_follower}>
        <div className="pop_left">
          <div style={{ display: 'flex' }}>
            <img style={{ width: '40px' }} src={props.avatar} alt="element"></img>
            <div className="pop_name">
              <div className="pop_fullName">{props.fullName}</div>
              <div className="pop_userName">{props.userName}</div>
            </div>
            {!checkFollowed(props.item) && !followed ? (
              <div
                onClick={() => {
                  dispatch(followApi(props.item._id));
                  setFollowed(true);
                }}
                style={{ cursor: 'pointer', color: '#0395F6', marginLeft: '5px', fontWeight: 'bold' }}
              >
                .Theo dõi
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <button className="pop_btn">Xóa</button>
      </div>
    );
  };

  return (
    <>
      <NavBar />

      <Grid container classes={{ root: classes.root }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="profile-header">
            <div className="profile-avatar-box">
              <img
                style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                className="profile-avatar"
                src={`http://localhost:5000/public/${infoFriend.avatar}`}
                alt="element"
              ></img>
            </div>

            <div className="profile-info">
              <div className="profile-title">
                <div className="profile-user-name">{infoFriend.userName}</div>
                <button
                  style={{ padding: '0px 10px' }}
                  className="profile__button__edit"
                  onClick={() => {
                    history.push({
                      pathname: `/inbox/${infoFriend._id}`,
                    });
                  }}
                >
                  Nhắn tin
                </button>
              </div>
              <div className="profile-info-detail">
                <div style={{ cursor: 'pointer' }} className="profile-post">
                  <b>{infoFriend?.posts?.length}</b> bài viết
                </div>
                <div
                  onClick={() => {
                    setIsShowFollowers(true);
                  }}
                  style={{ cursor: 'pointer' }}
                  className="profile-followers"
                >
                  <b>{infoFriend?.followers?.length}</b> người theo dõi
                </div>
                <div
                  onClick={() => {
                    setIsShowFollowing(true);
                  }}
                  style={{ cursor: 'pointer' }}
                  className="profile-following"
                >
                  Đang theo dõi <b>{infoFriend?.following?.length}</b> người dùng
                </div>
              </div>
              <div className="profile-full-name">{infoFriend.fullName}</div>
            </div>
          </div>

          <div className="profile-body">
            {infoFriend?.posts &&
              infoFriend?.posts.length > 0 &&
              infoFriend?.posts.map((item) => (
                <ShowPicture likes={item.likes.length} comments={item.comments.length} picture={item.pictures[0].img} />
              ))}
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>

      <Popup
        isOpen={isShowFollowers}
        handleClose={() => {
          setIsShowFollowers(false);
        }}
        title="Người theo dõi"
        isIconClose={true}
        minwidth="500px"
        isScroll={true}
      >
        {listFollower &&
          listFollower.length > 0 &&
          listFollower.map((item) => (
            <FollowerItem item={item} avatar={item.avatar} fullName={item.fullName} userName={item.userName} />
          ))}
      </Popup>

      <Popup
        isOpen={isShowFollowing}
        handleClose={() => {
          setIsShowFollowing(false);
        }}
        title="Đang theo dõi"
        isIconClose={true}
        minwidth="500px"
        isScroll={true}
      >
        {listFollowing &&
          listFollowing.length > 0 &&
          listFollowing.map((item) => (
            <div className={classes.popup_follower}>
              <div className="pop_left">
                <div style={{ display: 'flex' }}>
                  <img style={{ width: '40px' }} src={item.avatar} alt="element"></img>
                  <div className="pop_name">
                    <div className="pop_fullName">{item.fullName}</div>
                    <div className="pop_userName">{item.userName}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(unFollowApi(item._id));
                }}
                className="pop_btn"
              >
                Đang theo dõi
              </button>
            </div>
          ))}
      </Popup>
    </>
  );
};

export default ProfileFriend;