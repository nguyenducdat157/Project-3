import { Avatar, Grid } from '@material-ui/core';
import NavBar from '../../Components/NavBar/Navbar';
import edit from '../../images/threedot.svg';
import './postDetail.css';
const PostDetail = () => {
  return (
    <>
      <NavBar />
      <div>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8} style={{ marginTop: '100px', display: 'flex' }}>
            <div>
              <img
                height="600px"
                src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/p526x296/256025704_2750629265242960_6161164980374242212_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=meHsPN1AI3AAX8vgnx_&_nc_ht=scontent.fhan3-3.fna&oh=998fae8c54e3f6d62621ee457887bd3e&oe=619548B1"
              />
            </div>
            <div className="post_detail_comment_container">
              <div className="post_detail_header">
                <Avatar className="post__image" src="" />
                <div className="post_detail_username">props.userName</div>
                <div className="post_detail_username" style={{ whiteSpace: 'nowrap' }}>
                  Đang theo dõi
                </div>
                <div style={{ display: 'flex', marginRight: '14px', justifyContent: 'flex-end', width: '70%' }}>
                  <img src={edit} alt="element" width="20px" />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default PostDetail;
