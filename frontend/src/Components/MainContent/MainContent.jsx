import React, { useEffect, useState } from 'react';
import './MainContent.css';
import Grid from '@material-ui/core/Grid';
// import uploadImage from '../../images/upload.png'
import PostItem from '../PostItem/PostItem';
import InfoSection from '../InfoSuggestion/InfoSection';
import Suggestion from '../Suggestions/Suggestion';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/post/post.slice';

const MainContent = () => {
  const dispatch = useDispatch();
  const [listPost, setListPost] = useState([]);
  const prevLink = 'http://localhost:5000/public/';

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getPosts());
      if (res?.payload?.data?.code === 0) {
        setListPost(res.payload.data.data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(listPost);

  return (
    <div>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={5} className="maincontent__container" style={{ marginTop: '50px' }}>
          <div>
            <div style={{ marginTop: '30px' }}>
              {listPost &&
                listPost.map((item, index) => (
                  <PostItem
                    id={item._id}
                    userName={item.userName}
                    postImage={prevLink + item.pictures[0].img}
                    likes={item.likes.length}
                  />
                ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={3} style={{ marginTop: '50px' }}>
          <div style={{ position: 'fixed', width: '100%' }}>
            <InfoSection className="maincontent__right" />
            <Suggestion className="maincontent__right" />
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default MainContent;
