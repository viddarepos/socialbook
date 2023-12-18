import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Leftside from "../../components/leftside/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightside from "../../components/rightside/Rightside";
import "./profile.css";
import { useParams } from "react-router"; //hook koji sluzi da koristimo username iz url 
import { axiosInstace } from "../../config";
import axios from "axios";


function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstace.get(`/users?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  }, [username])
  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftside />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF + "person/noCoverTest.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
              />
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightside user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
