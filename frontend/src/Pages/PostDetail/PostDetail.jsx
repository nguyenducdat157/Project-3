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
                alt="element"
                src="https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/p526x296/244711233_185380257079635_1099484810878147522_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=825194&_nc_ohc=-cJhU1AUqG4AX-NOCIh&_nc_ht=scontent.fhan4-1.fna&oh=61c5092b359ace65a1e7e966622b7053&oe=61A35632"
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
