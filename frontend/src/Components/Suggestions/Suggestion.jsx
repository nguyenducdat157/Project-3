import React from "react";
import "./Suggestion.css"
import { Avatar } from '@material-ui/core';
import imageSrc from '../../images/pp1.png';

const Suggestion = () => {

    const suggestItem = (imageSrc, username, followed) => {
        return (
            <div className="suggestions__friends">
            <Avatar src={imageSrc} className="suggestions__image"/>
            <a className="suggestions__username" href="">{username}</a>
            {
                followed ? <div className="suggestions__follow" style={{color: '#262626'}}>Đang theo dõi</div> : 
                           <div className="suggestions__follow">Theo dõi</div>
            }     
        </div>
        )
    }
    return (
        <div>
            <div className="suggestions__container">
                <div className="suggestions__header">
                    <div>Gợi ý cho bạn</div>
                    <div className="suggestions__header__showall">Xem tất cả</div>
                </div>
                <div className="suggestions__body">
                    {suggestItem(imageSrc, "NgocHao2001", true)}
                    {suggestItem(imageSrc, "Lethuha2000", false)}
                    {suggestItem(imageSrc, "NgocHao2001", true)}
                    {suggestItem(imageSrc, "NgocHao2001", true)}
                    {suggestItem(imageSrc, "NgocHao2001", true)}
                </div>
            </div>
        </div>
    )
}

export default Suggestion