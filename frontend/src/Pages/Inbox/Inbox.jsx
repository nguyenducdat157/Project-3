import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import Grid from '@material-ui/core/Grid';
import './Inbox.css';
import { useSelector, useDispatch } from 'react-redux';
import { getListMessage, addMessage, getRooms } from '../../redux/chat/chat.slice';
import { getProfileFriend } from '../../redux/user/user.slice';
import RoomIcon from '@material-ui/icons/Room';
const Inbox = (props) => {
  const dispatch = useDispatch();
  const listMessage = useSelector((state) => state.chat?.listMessage?.data?.data?.room);
  const infoUser = useSelector((state) => state.auth.user.data.data);
  const infoFriend = useSelector((state) => state.user.profileFriend.data.data);
  const socket = useSelector((state) => state.socket.socket.payload);
  const rooms = useSelector((state) => state.chat?.rooms?.data?.data);
  const date = Date.now();

  const [idFriend, setIdFriend] = useState('');
  const [active, setActive] = useState(0);

  const [inputText, setInputText] = useState('');
  const messagesEnd = useRef(null);

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChangeInput = (e) => {
    setInputText(e.target.value);
  };

  const keyPress = async (e) => {
    if (e.keyCode === 13) {
      await dispatch(
        addMessage({
          receiver: props.match.params.id,
          content: inputText,
        }),
      );
      const data = {
        idFriend: props.match.params.id,
      };
      socket?.emit('inbox_user', data);
      dispatch(getListMessage(props.match.params.id));
      scrollToBottom();
      setInputText('');
    }
  };

  useEffect(() => {
    socket?.on('get_message', async (data) => {
      if (infoUser._id === data.idFriend) {
        await dispatch(getListMessage(props.match.params.id));
        scrollToBottom();
      }
    });
  }, [socket]);

  useEffect(() => {
    dispatch(getListMessage(props.match.params.id));
    dispatch(getProfileFriend(props.match.params.id));
    dispatch(getRooms());
    scrollToBottom();
  }, []);

  const difference = (date1, date2) => {
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const minute = 1000 * 60;
    return (date2utc - date1utc) / minute;
  };

  return (
    <>
      <NavBar />

      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="inbox_box">
            <div className="inbox_listChat">
              <div className="listChat_header">{infoUser.userName}</div>
              <div className="listChat_content">
                {rooms &&
                  rooms.length > 0 &&
                  rooms.map((room, index) => (
                    <div
                      onClick={() => {
                        if (room?.users[0].user._id === infoUser._id) {
                          dispatch(getListMessage(room?.users[1].user._id));
                          dispatch(getProfileFriend(room?.users[1].user._id));
                        } else {
                          dispatch(getListMessage(room?.users[0].user._id));
                          dispatch(getProfileFriend(room?.users[0].user._id));
                        }

                        setActive(index);
                      }}
                      className={index === active ? 'room_active' : 'room_element'}
                    >
                      <img
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        className="room-avatar"
                        src={`http://localhost:5000/public/${
                          room?.users[0].user._id === infoUser._id
                            ? room?.users[1].user.avatar
                            : room?.users[0].user.avatar
                        }`}
                        alt="element"
                      ></img>
                      <div className="room_userName">
                        <div className="room_userName">
                          {room?.users[0].user._id === infoUser._id
                            ? room?.users[1].user.userName
                            : room?.users[0].user.userName}
                        </div>
                        <div className="room_active_text">
                          {room?.users[1].user.active ? (
                            <ul className="active_user">
                              <li>Đang hoạt động</li>
                            </ul>
                          ) : (
                            <div style={{ color: 'silver' }}>
                              Hoạt động{' '}
                              {Math.abs(difference(new Date(Date.now()), new Date(room?.users[1].user.updatedAt)))} phút
                              trước
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="box_data">
              <div className="header">
                <img
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  className="profile-avatar"
                  src={`http://localhost:5000/public/${infoFriend.avatar}`}
                  alt="element"
                ></img>
                <div className="profile-user-name">{infoFriend.userName}</div>
              </div>
              <div className="chat">
                <div ref={messagesEnd} className="chat_content">
                  {listMessage &&
                    listMessage.length > 0 &&
                    listMessage.map((item, index) =>
                      infoUser._id === item.sender ? (
                        <div className="inbox_element">
                          <div className="inbox_content_sender">{item.content}</div>
                        </div>
                      ) : (
                        <div className="inbox_element">
                          <div className="inbox_content_receiver">{item.content}</div>
                        </div>
                      ),
                    )}
                </div>
                <input
                  onChange={handleChangeInput}
                  value={inputText}
                  className="chat_input"
                  placeholder="Nhắn tin..."
                  type="text"
                  onKeyDown={keyPress}
                ></input>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
};

export default Inbox;
