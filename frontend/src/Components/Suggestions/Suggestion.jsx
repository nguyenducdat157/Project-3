import React, { useEffect, useState } from 'react';
import './Suggestion.css';
import { Avatar } from '@material-ui/core';
import { getListUserSuggestion, followApi, unFollowApi } from '../../redux/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';

const Suggestion = () => {
  const listSuggest = useSelector((state) => state.user.userSuggest.data.data);

  const dispatch = useDispatch();
  useEffect(() => {
    const suggestion = async () => {
      await dispatch(getListUserSuggestion());
    };
    suggestion();
  }, []);

  console.log('suggestion: ', listSuggest);

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

    return (
      <div className="suggestions__friends">
        <Avatar src={props.imageSrc} className="suggestions__image" />
        <a className="suggestions__username" href="localhost:3000/#">
          {props.username}
        </a>
        {followed ? (
          <div onClick={handleUnFollow} className="suggestions__follow" style={{ color: '#262626' }}>
            Đang theo dõi
          </div>
        ) : (
          <div onClick={handleFollow} className="suggestions__follow">
            Theo dõi
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <div className="suggestions__container">
        <div className="suggestions__header">
          <div>Gợi ý cho bạn</div>
          <div className="suggestions__header__showall">Xem tất cả</div>
        </div>
        <div className="suggestions__body">
          {listSuggest &&
            listSuggest.length > 0 &&
            listSuggest.map((item, index) => (
              <SuggestItem key={index} id={item._id} avatar={item.avatar} username={item.userName} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
