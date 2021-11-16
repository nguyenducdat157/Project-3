import React, { useEffect, useState } from 'react';
import './PostItem.css';
import { Avatar } from '@material-ui/core';
import love from '../../images/love.svg';
import redlove from '../../images/redlove.svg';
import comment from '../../images/comment.svg';
import edit from '../../images/threedot.svg';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { commentApi, reactApi } from '../../redux/post/post.slice';
import { border } from '@mui/system';
import { likeNotification, commentNotification } from '../../redux/notification/notification.slice';
const PostItem = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const [numberLikes, setNumberLikes] = useState(props.likes);
  const commentList = [...props.comments];
  const [commentExtra, setCommentExtra] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.auth.user.data.data);
  const socket = useSelector((state) => state.socket.socket.payload);

  const handleReact = async () => {
    await dispatch(reactApi(props.id));
    setNumberLikes(liked ? numberLikes - 1 : numberLikes + 1);
    setLiked(!liked);
    if (!liked) {
      await dispatch(likeNotification(props.id));
      const data = {
        idPost: props.id,
        userNameCreatePost: props.userName,
      };
      socket?.emit('like_post', data);
    }
  };

  const handleAddComment = async () => {
    setCommentValue('');
    const data = {
      postId: props.id,
      userId: infoUser._id,
      content: commentValue,
    };
    const res = await dispatch(commentApi(data));

    if (res?.payload?.data?.code === 0) {
      const newList = [...commentExtra, { ...data, userName: infoUser.userName }];
      setCommentExtra(newList);
      await dispatch(commentNotification(props.id));
      const dataPost = {
        idPost: props.id,
        userNameCreatePost: props.userName,
      };
      socket?.emit('comment_post', dataPost);
    }
  };

  useEffect(() => {
    setActive(commentValue !== '');
  }, [commentValue]);

  const CommentExtraList = (list) => {
    if (list.length > 0) {
      return list.map((item, index) => (
        <div style={{ display: 'flex' }}>
          <p className="post_comment" style={{ fontWeight: '600' }}>
            {item.userName} &nbsp;
          </p>
          <p className="post_comment" style={{ marginLeft: '-10px' }}>
            {item.content}
          </p>
        </div>
      ));
    }
    return <span></span>;
  };

  return (
    <div className="post__container">
      {/* Header */}
      <div className="post__header">
        <Avatar className="post__image" src={props.avatar} />
        <div className="post__username">{props.userName}</div>
        <div style={{ display: 'flex', margin: 'auto', justifyContent: 'flex-end', width: '70%' }}>
          <img src={edit} alt="element" width="20px" />
        </div>
      </div>

      {/* Image */}
      <div>
        <img src={props.postImage} alt="element" width="100%" style={{ maxHeight: '770px' }} />
      </div>
      {/* Analytics */}
      <div>
        <div style={{ marginLeft: '10px' }}>
          {liked ? (
            <img src={redlove} className="post_reactimage" onClick={handleReact} />
          ) : (
            <img src={love} className="post_reactimage" onClick={handleReact} />
          )}
          {/* <FontAwesomeIcon
            icon={faHeart}
            style={{ color: false ? 'red' : 'black', fontSize: '25px', margin: '8px' }}
            className="post_reactimage"
            onClick={() => {
              socket?.emit('like', socket.id);
            }}
          />
          /> */}
          <img src={comment} alt="element" className="post_reactimage" />
        </div>
        <div style={{ fontWeight: 'bold', marginLeft: '20px  ' }}>{numberLikes} likes</div>
      </div>
      <div style={{ display: 'flex', margin: '10px 10px 0' }}>
        <p style={{ fontWeight: '600', margin: '0px 0px' }}>{props.userName} &nbsp;</p>
        <p style={{ margin: '0px 0px' }}>{props.title}</p>
      </div>

      {/* Comment Section */}
      <div>
        {commentList.map((item, index) =>
          index < 2 ? (
            <div style={{ display: 'flex' }}>
              <span className="post_comment" style={{ fontWeight: '600' }}>
                {item.userId?.userName} &nbsp;
              </span>
              <span className="post_comment" style={{ marginLeft: '-10px' }}>
                {item.content}
              </span>
            </div>
          ) : (
            <span></span>
          ),
        )}
        {CommentExtraList(commentExtra)}
        {commentList.length + commentExtra.length >= 3 && (
          <div style={{ fontSize: '14px', margin: '10px', color: '#8e8e8e' }}>
            Xem tất cả {commentList.length + commentExtra.length} bình luận
          </div>
        )}
        <div style={{ display: 'flex' }}>
          <input
            text="text"
            className="post__commentbox"
            placeholder="Add a comment..."
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
            value={commentValue}
          />
          <button className="button_add_comment" onClick={handleAddComment} disabled={!active}>
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
