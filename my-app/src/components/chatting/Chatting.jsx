import axios from "axios";
import React, { useState, useEffect } from "react";
import { axiosInstace } from "../../config";
import "./chatting.css";

function Chatting({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id); //m => m oba usera iz jedan razgovor

    const getUser = async () => {
      try {
        const res = await axiosInstace.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="chatting">
      <img
        className="chattingImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="chattingName">{user?.username}</span>
    </div>
  );
}
export default Chatting;
