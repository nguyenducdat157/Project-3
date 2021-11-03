import React, { useRef, useState, useEffect } from "react";
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Autocomplete } from "@mui/material";
import { TextField } from "@material-ui/core";
import InfoSection from "../InfoSuggestion/InfoSection";

const NavBar = () => {
    const ref = useRef();
    const history = useHistory();
    const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
    const [toggleAvatar, setToggleAvatar] = useState(false);
    const addPost = () => {
        setIsOpenCreatePost(true);
    }
    const handleClose = () => {
        setIsOpenCreatePost(false);
    }

    const top100Films = [
        {
            username: "ducdatchelsea",
            fullname: "Đức Đạt Chelsea"
        },
        {
            username: "hieupc",
            fullname: "Phan Chí Hiếu"
        },
        {
            username: "parkchangel",
            fullname: "Hoàng Huy Quân"
        },
        {
            username: "lkbinh",
            fullname: "Lương Khánh Bình"
        }
    ];

    useEffect(() => {
        const checkIfClickedOutside = e => {
          if (toggleAvatar && ref.current && !ref.current.contains(e.target)) {
            setToggleAvatar(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [toggleAvatar])
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
                    {/* <input text="text" className="navbar__searchBar" placeholder="Search" /> */}
                    <Autocomplete className="navbar__searchBar__container"
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films.map((option) => option)}
                        getOptionLabel={(option) => option.username}
                        renderOption={(object, option) => {
                           return  (
                               <div className="search__dropdown_item" onClick={() => {history.push("/login")}}>
                                   <Avatar src={pp} className="search__dropdown_item_avatar"/>
                                   <div>
                                       <p className="search__dropdown_item_username">{option.username}</p>
                                       <p className="search__dropdown_item_fullname">{option.fullname}</p>
                                   </div>
                               </div>
                           )
                        }}
                        onInputChange={(e) => {console.log(e.nativeEvent.data)} }
                        renderInput={(params) => (
                        <TextField
                            className="navbar__searchBar"
                            {...params}
                            placeholder="Tìm kiếm"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                            variant="outlined"
                        />
                        )}
                    />
                    </Grid>
                    <Grid item xs={3} className="navbar__img__container">
                        <a href='/'><img className="navbar__img" src={home} width="25px"/></a>
                        <img className="navbar__img" src={add} width="25px" height="25px" style={{borderRadius: '1px'}}
                            onClick={addPost}
                        />
                        {
                            true ? <img className="navbar__img" src={react} width="25px" /> :
                                    <img className="navbar__img" src={reactClick} width="25px" height="25px"/>
                        }
                        <div class="dropdown" ref={ref}> 
                        <Avatar src={pp} className="navbar__img navbar__avatar" style={{"maxWidth":"25px","maxHeight":"25px"}} onClick={() => {setToggleAvatar(!toggleAvatar)} }/>
                        <div className="navbar__number__noti">2</div>
                        {
                            toggleAvatar && 
                             <div className="dropdown__content">
                             <div className="dropdown__component"><AccountCircleIcon style={{marginRight: '10px'}}/>Trang cá nhân</div>
                             <div className="dropdown__component" style={{marginBottom: '10px'}}><SettingsIcon style={{marginRight: '10px'}}/>Cài đặt</div>
                             <div className="dropdown__component">Đăng xuất</div>
                             </div>
                        }
                       
                        </div>
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
