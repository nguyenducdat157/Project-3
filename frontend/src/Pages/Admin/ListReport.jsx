import { Link } from 'react-router-dom';
import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
const ListReport = () => {
  const useStyles = makeStyles({
    reportItems: {
      display: 'flex',
      width: '100%',
      padding: '16px',
      borderBottom: '1px solid #dbdbdb',
      alignItems: 'center',
      fontSize: '16px',
    },
    link: {
      textDecoration: 'none',
      color: '#262626',
    },
  });
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div
        className={classes.reportItems}
        onClick={() => {
          history.push('/post/id');
        }}
      >
        <div style={{ marginRight: '20px' }}>
          Tài khoản{' '}
          <strong>
            <Link to="/profile/akakkaka" className={classes.link}>
              ducdatchelsea
            </Link>
          </strong>{' '}
          đã báo cáo một bài viết vì lí do <i>Nội dung có tính bạo lực</i>
        </div>
        <img
          src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/s600x600/263460917_340713364552888_3682826792998014935_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=dc6kSkxaQXwAX8WVUtU&tn=yhjAtF_GEG3RpGPn&_nc_ht=scontent.fhan3-4.fna&oh=41527230f4660ae0c0111a9362d941ec&oe=61B437B3"
          height="36"
          width="36"
        />
      </div>
      <div
        className={classes.reportItems}
        onClick={() => {
          history.push('/profile/id');
        }}
      >
        <div style={{ marginRight: '20px' }}>
          Tài khoản{' '}
          <strong>
            <Link to="/profile/akakkaka" className={classes.link}>
              ducdatchelsea
            </Link>
          </strong>{' '}
          đã báo cáo một tài khoản vì lí do <i>Đăng nội dung dưới 13 tuổi</i>
        </div>
        <img
          src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/s600x600/263460917_340713364552888_3682826792998014935_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=dc6kSkxaQXwAX8WVUtU&tn=yhjAtF_GEG3RpGPn&_nc_ht=scontent.fhan3-4.fna&oh=41527230f4660ae0c0111a9362d941ec&oe=61B437B3"
          height="36"
          width="36"
        />
      </div>
    </>
  );
};

export default ListReport;
