import React, { useState } from "react";
import './Navbar.css';
import insta_log from '../../images/logoinsta.png';
import home from '../../images/home.svg';
import react from '../../images/love.svg';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import pp from '../../images/avt-ins.jpg';
import add from '../../images/add.png';
import reactClick from '../../images/blacklove.png';
import { useHistory } from "react-router";
import Popup from "../Popup/Popup";

const NavBar = () => {
    const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
    const addPost = () => {
        setIsOpenCreatePost(true);
    }
    const handleClose = () => {
        setIsOpenCreatePost(false);
    }
    return (
        <>
        <div style={{zIndex: "999", width: '100%',position: 'fixed'}}>
            <div className="navbar__barContent">
                <Grid container>
                    <Grid item xs={2}> </Grid>
                    <Grid item xs={3}>
                        <a href='/'> <img className="navbar_logo" src={insta_log} width="105px" /></a>   
                    </Grid>
                    <Grid item xs={3}>
                    <input text="text" className="navbar__searchBar" placeholder="Search" />
                    </Grid>
                    <Grid item xs={3} style={{"display":"flex"}}>
                        <a href='/'><img className="navbar__img" src={home} width="25px"/></a>
                        <img className="navbar__img" src={add} width="25px" height="25px" style={{borderRadius: '1px'}}
                            onClick={addPost}
                        />
                        {
                            true ? <img className="navbar__img" src={react} width="25px" /> :
                                    <img className="navbar__img" src={reactClick} width="25px" height="25px"/>
                        }
                        <Avatar src={pp} className="navbar__img" style={{"maxWidth":"25px","maxHeight":"25px"}} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        </div>
        {isOpenCreatePost && <Popup isOpen={isOpenCreatePost} handleClose={handleClose} title={"Tạo bài viết mới"} isIconClose={false}></Popup>}
        </>
    )
}

export default NavBar;
