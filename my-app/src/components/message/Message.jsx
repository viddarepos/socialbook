
import React, { useState, useEffect } from 'react'
import "./message.css";
import { format } from "timeago.js";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';

const Message = ({ message, own }) => {
    const [user, setUser] = useState({});
    const currentUser = useContext(AuthContext);


    /*useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${currentUser._id}`);
            setUser(res.data);
        };
        fetchUser();
    }, [currentUser._id]);*/

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {/* */}    <img className='messageImg' src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message