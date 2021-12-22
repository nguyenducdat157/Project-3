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
import { getPostMe, getPostFriend } from '../../redux/post/post.slice';
import love from '../../images/love.svg';
import edit from '../../images/threedot.svg';
import comment from '../../images/comment.svg';
import { getProfileFriend } from '../../redux/user/user.slice';
import { useHistory } from 'react-router';
import { followNotification, reportUserNotification } from '../../redux/notification/notification.slice';
import { listReportUser } from '../../ultils/constants';
import { showModalMessage } from '../../redux/message/message.slice';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotFound from '../NotFound';
const useStyles = makeStyles(() => ({
  profileContainer: {
    width: '100%',
    maxWidth: '950px',
    margin: 'auto',
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
  const infoFriend = useSelector((state) => state.user.profileFriend?.data?.data);
  const socket = useSelector((state) => state.socket.socket.payload);
  const listPostForFriend = useSelector((state) => state.post?.postOfFriend?.data);
  const history = useHistory();
  const [showModal, setShowModal] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async () => {
    await dispatch(followApi(infoFriend._id));

    dispatch(followNotification(infoFriend._id));
    setIsFollowed(true);

    const data = {
      idUser: infoFriend._id,
      userNameCreatePost: infoFriend.userName,
    };
    socket?.emit('follow_user', data);
    // window.location.reload();
  };
  const handleUnFollow = async () => {
    setIsFollowed(false);
    await dispatch(unFollowApi(infoFriend._id));
  };

  const showPost = () => {
    if (infoUser?.role === 1 || infoFriend?.status === 0) return true;
    return listFollowing?.find((i) => i._id === infoFriend?._id) ? true : false;
  };

  const ShowPicture = (props) => {
    return (
      <>
        <div
          className="profile_picture_container"
          onClick={() => {
            history.push({
              pathname: `/post/${props.id}`,
              state: {
                postId: props.id,
                liked: props.liked,
                numberLikes: props.likes,
                followed: listFollowing?.find((i) => i._id === props?.userId) ? true : false,
              },
            });
          }}
        >
          <img
            className="profile_picture"
            style={{ width: '300px', height: '300px' }}
            src={'http://localhost:5000/public/' + props.picture}
          ></img>
          <div className="profile_icon_in_picture">
            <span style={{ display: 'flex', alignItems: 'center', columnGap: '6px' }}>
              {/* <img className="profile_love" src={love}></img> */}
              <FavoriteIcon style={{ color: 'white' }} />
              <span style={{ color: 'white', fontWeight: 'bold' }}>{props.likes}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', columnGap: '6px' }}>
              {/* <img className="profile_commnet" src={comment}></img> */}
              <ChatBubbleIcon style={{ color: 'white' }} />
              <span style={{ color: 'white', fontWeight: 'bold' }}>{props.comments}</span>
            </span>
          </div>
        </div>
      </>
    );
  };

  const handleReport = async (content) => {
    const data = {
      userId: infoFriend._id,
      content: content,
    };
    const res = await dispatch(reportUserNotification(data));
    if (res?.payload?.data?.code === 0) {
      dispatch(
        showModalMessage({
          type: 'SUCCESS',
          msg: 'Báo cáo thành công!, Cảm ơn bạn đã phản hồi với chúng tôi',
        }),
      );
      setShowModal(0);
      const dataUser = {
        idPost: props.id,
        userNameCreatePost: props.userName,
        admin: 'admin',
      };
      socket?.emit('report_user', dataUser);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getFollowers());
      dispatch(getFollowing());
      dispatch(getProfileFriend(props.match.params.id));
      dispatch(getPostFriend(props.match.params.id));
      listFollowing?.filter((i) => i._id === infoFriend?._id).length > 0 ? setIsFollowed(true) : setIsFollowed(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listFollowing?.filter((i) => i._id === infoFriend?._id).length > 0]);

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
  console.log(infoFriend);
  return (
    <>
      {infoFriend?.status !== 2 || infoUser?.role === 1 ? (
        <>
          <NavBar />
          <div className={classes.profileContainer}>
            <div className="profile-header">
              <div className="profile-avatar-box">
                <img
                  style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                  className="profile-avatar"
                  src={`http://localhost:5000/public/${infoFriend?.avatar}`}
                  alt="element"
                ></img>
              </div>

              <div className="profile-info">
                <div className="profile-title">
                  <div className="profile-user-name">{infoFriend?.userName}</div>
                  {infoUser?.role === 0 && (
                    <>
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
                      {isFollowed ? (
                        <button
                          className="followed"
                          onClick={handleUnFollow}
                          style={{ marginTop: '0px', marginLeft: '20px', width: '120px' }}
                        >
                          Hủy theo dõi
                        </button>
                      ) : (
                        <button
                          className="follow"
                          onClick={handleFollow}
                          style={{ marginTop: '0px', marginLeft: '20px' }}
                        >
                          Theo dõi
                        </button>
                      )}
                      <img
                        src={edit}
                        style={{ marginLeft: '20px', cursor: 'pointer' }}
                        onClick={() => {
                          setShowModal(1);
                        }}
                      />
                    </>
                  )}
                </div>
                <div className="profile-info-detail">
                  <div style={{ cursor: 'pointer' }} className="profile-post">
                    <b>{listPostForFriend?.length}</b> bài viết
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
                <div className="profile-full-name">{infoFriend?.fullName}</div>
              </div>
            </div>

            {showPost() && (
              <div className="profile-body">
                {listPostForFriend &&
                  listPostForFriend?.length > 0 &&
                  listPostForFriend?.map((item) => (
                    <ShowPicture
                      likes={item.likes.length}
                      comments={item.comments.length}
                      picture={item.pictures[0].img}
                      id={item?._id}
                      liked={item.likes.find((i) => i.userId === infoUser._id) ? true : false}
                      userId={item?.postBy}
                    />
                  ))}
              </div>
            )}
          </div>

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
          {showModal === 1 && (
            <Popup
              isOpen={showModal === 1}
              handleClose={() => {
                setShowModal(0);
              }}
              isIconClose={false}
              isScroll={true}
            >
              <div
                className="popup_report_text"
                style={{ color: 'red', fontWeight: 'bold' }}
                onClick={() => {
                  setShowModal(2);
                }}
              >
                Báo cáo tài khoản
              </div>
              <hr className="popup_report_hr" />

              <div
                className="popup_report_text"
                onClick={() => {
                  setShowModal(0);
                }}
              >
                Hủy
              </div>
            </Popup>
          )}
          {showModal === 2 && (
            <Popup
              isOpen={showModal === 2}
              handleClose={() => {
                setShowModal(0);
              }}
              isIconClose={true}
              isScroll={true}
              title="Báo cáo"
            >
              <div className="popup_report_text" style={{ color: 'black', fontWeight: 'bold' }}>
                Tại sao bạn muốn báo cáo tài khoản này ?
              </div>
              <hr className="popup_report_hr" />
              {listReportUser.map((content) => (
                <>
                  <div
                    className="popup_report_text"
                    onClick={() => {
                      handleReport(content);
                    }}
                  >
                    {content}
                  </div>
                  <hr className="popup_report_hr" />
                </>
              ))}
              <div
                className="popup_report_text"
                onClick={() => {
                  setShowModal(0);
                }}
              >
                Hủy
              </div>
            </Popup>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProfileFriend;
