import React, { useEffect, useState } from 'react';
import './Suggestion.css';
import { Avatar } from '@material-ui/core';
import { getListUserSuggestion, followApi } from '../../redux/user/user.slice';
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

  const SuggestItem = (id, imageSrc, username) => {
    const [followed, setFollowed] = useState(false);
    const handleFollow = async () => {
      await dispatch(followApi(id.id));
      setFollowed(true);
    };
    const handleUnFollow = () => {
      setFollowed(false);
    };
    return (
      <div className="suggestions__friends">
        <Avatar src={imageSrc} className="suggestions__image" />
        <a className="suggestions__username" href="localhost:3000/#">
          {username}
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
          {/* {suggestItem(imageSrc, 'NgocHao2001', true)}
          {suggestItem(imageSrc, 'Lethuha2000', false)}
          {suggestItem(imageSrc, 'NgocHao2001', true)}
          {suggestItem(imageSrc, 'NgocHao2001', true)}
          {suggestItem(imageSrc, 'NgocHao2001', true)} */}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
