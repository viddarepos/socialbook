import React, { useContext } from "react";
import "./navbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Navbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Facebook</span>
        </Link>
      </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <Link to={"/profile/" + user.username} style={{ textDecoration: "none" }}>
            <span className="navbarLink">Profile</span>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="navbarLink">Timeline</span>
          </Link>
          <span className="navbarLink">Settigns</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <Person className="personIcon" />
            <span className="navbarIconBadge">4</span>
          </div>
          <div className="navbarIconItem">
            <Link to="/messenger">
              <Chat className="chatIcon" />
            </Link>
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem">
            <Notifications className="notificationIcon" />
            <span className="navbarIconBadge">3</span>
          </div>
        </div>
        <div className="userInfo">
          <Link style={{ textDecoration: "none" }} to={`/profile/${user.username}`}>
            <div className="userProfile">
              <label className="infoUsername">{user.username}</label>
            </div>
          </Link>
        </div>
      </div>
    </div >
  );
}
export default Navbar;
