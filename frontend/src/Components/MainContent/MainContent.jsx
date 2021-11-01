import React from 'react';
import "./MainContent.css";
import Grid  from '@material-ui/core/Grid';
// import uploadImage from '../../images/upload.png'
import PostItem from '../PostItem/PostItem';
import InfoSection from '../InfoSuggestion/InfoSection';
import Suggestion from '../Suggestions/Suggestion';

const MainContent = () => {

    let data=[
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anindya",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },

        ];

    return ( 
        <div>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={5} className="maincontent__container" style={{marginTop: "50px"}}>
                    <div>
                        <div style={{marginTop: '30px'}}>
                            {
                            data.map((item,index)=>(
                                    <PostItem id={item.postId} userName={item.userName} postImage={item.postImageURL} likes={item.likes} />
                                ))
                            }
                        </div>        
                    </div>
                </Grid>
                <Grid item xs={3} style={{marginTop: "50px"}}>
                    <div style={{position: "fixed", width: '100%'}}>
                    <InfoSection className="maincontent__right"/>
                    <Suggestion className="maincontent__right"/> 
                    </div>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
     );

}
 
export default MainContent;