import React from 'react';
import './PostItem.css';
import { Avatar } from '@material-ui/core';
// import love from "../../images/love.svg";
import comment from '../../images/comment.svg';
import edit from '../../images/threedot.svg';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const PostItem = (props) => {
  console.log(props);
  const commentList = [
    {
      userName: 'DucDatChelsea',
      comment: 'Xinh the',
    },
    {
      userName: 'DucDatChelsea',
      comment: 'Xinh the',
    },
    {
      userName: 'DucDatChelsea',
      comment: 'Xinh the',
    },
    {
      userName: 'DucDatChelsea',
      comment: 'Xinh the',
    },
  ];

  return (
    <div className="post__container">
      {/* Header */}
      <div className="post__header">
        <Avatar
          className="post__image"
          src="https://scontent.fhan3-5.fna.fbcdn.net/v/t1.6435-9/245623809_2977355652538149_7805468927500602316_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=TF00sZ1V7rMAX-KuTIE&_nc_ht=scontent.fhan3-5.fna&oh=39e1310d69957cc9e3d13adf61d64e89&oe=61A20864"
        />
        <div className="post__username">{props.userName}</div>
        <div style={{ display: 'flex', margin: 'auto', justifyContent: 'flex-end', width: '70%' }}>
          <img src={edit} alt="element" width="20px" />
        </div>
      </div>

      {/* Image */}
      <div>
        <img src={props.postImage} alt="element" width="100%" />
      </div>

      {/* Analytics */}
      <div>
        <div style={{ marginLeft: '10px' }}>
          {/* <img src={love} className="post_reactimage"/> */}
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: false ? 'red' : 'black', fontSize: '25px', margin: '8px' }}
            className="post_reactimage"
          />
          <img src={comment} alt="element" className="post_reactimage" />
        </div>
        <div style={{ fontWeight: 'bold', marginLeft: '20px  ' }}>{props.likes} likes</div>
      </div>
      {/* Comment Section */}
      <div>
        {commentList.map((item, index) =>
          index < 4 ? (
            <div className="post_comment">
              {item.userName}: {item.comment}
            </div>
          ) : (
            <span></span>
          ),
        )}
        <input text="text" className="post__commentbox" placeholder="Add a comment..." />
      </div>
    </div>
  );
};

export default PostItem;
