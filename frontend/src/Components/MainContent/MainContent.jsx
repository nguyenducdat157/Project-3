import React, { useEffect, useState } from 'react';
import './MainContent.css';
import Grid from '@material-ui/core/Grid';
// import uploadImage from '../../images/upload.png'
import PostItem from '../PostItem/PostItem';
import InfoSection from '../InfoSuggestion/InfoSection';
import Suggestion from '../Suggestions/Suggestion';
import axios from 'axios';

const MainContent = () => {
  const [listPost, setListPost] = useState([]);
  const prevLink = 'http://localhost:5000/public/';

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        url: 'http://localhost:5000/api/post/get-posts',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setListPost(response.data.data);
        }
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={5} className="maincontent__container" style={{ marginTop: '50px' }}>
          <div>
            <div style={{ marginTop: '30px' }}>
              {listPost && listPost.length > 0 ? (
                listPost.map((item, index) => (
                  <PostItem
                    id={item._id}
                    userName={item.userName}
                    postImage={prevLink + item.pictures[0].img}
                    likes={item.likes.length}
                  />
                ))
              ) : (
                <PostItem
                  id={'123'}
                  userName={'ducdat'}
                  postImage={
                    'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-9/p180x540/246717433_3056114554717580_4734206533511619751_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=pjYZTK7ALcwAX9fvQQF&_nc_ht=scontent.fhan3-1.fna&oh=4c15c1d1fc669a7e0d4da518bf208569&oe=61A6A6F9'
                  }
                  likes={4}
                />
              )}
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
