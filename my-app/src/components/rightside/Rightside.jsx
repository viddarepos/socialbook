import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstace } from "../../config";
import {
  Add,
  Remove,
  MobileFriendly,
  LocalHospital,
  CardTravel,
} from "@material-ui/icons";
import Aos from "aos";
import "aos/dist/aos.css";
import "./rightSide.css";

function Rightside({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosInstace.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axiosInstace.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axiosInstace.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightside = () => {
    return (
      <>
        <div className="rightbarWrapper">
          <div className="adTitle">
            <h4>ADVERTISEMENTS FEED</h4>
          </div>
          <div className="testadFeed">
            <div className="adFeed" data-aos="fade-left">
              <div className="adInfo">
                <div className="testforad">
                  <div className="adNotf">
                    <p>Ad</p>
                  </div>
                  <img className="rightbarAd" src="assets/add1.jpg" alt="" />
                  <div className="iconAndTextFlex">
                    <MobileFriendly className="adIcon" />
                    <h4 className="rightbarTitle">
                      Available on IOS and ANDROID
                    </h4>
                    <p className="adText">
                      Check your commitments <b>quickly</b> and <b>easily</b>{" "}
                      with the new Metropolitan app
                    </p>
                  </div>
                </div>
              </div>
              <div className="adInfo">
                <div className="testforad">
                  <div className="adNotf">
                    <p>Ad</p>
                  </div>
                  <img className="rightbarAd" src="assets/add2.jpg" alt="" />
                  <div className="iconAndTextFlex">
                    <LocalHospital className="adIcon" />
                    <h4 className="rightbarTitle">Take care of your health</h4>
                  </div>
                  <p className="adText">
                    A natural <b>vitamin</b> for your body with a flexible way
                    of use.
                  </p>
                </div>
              </div>
              <div className="adInfo">
                <div className="testforad">
                  <div className="adNotf">
                    <p>Ad</p>
                  </div>
                  <img className="rightbarAd" src="assets/add3.jpg" alt="" />
                  <div className="iconAndTextFlex">
                    <CardTravel className="adIcon" />
                    <h4 className="rightbarTitle">Let's travel the world</h4>
                  </div>
                  <p className="adText">
                    Personal agency of <b>Facebook</b> creators with business
                    class
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ul className="rightbarFriendList">
            {/* {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))} */}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightside = () => {
    return (
      <>
        <div className="rightbarWrapper">
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Remove" : "Add"}
              {followed ? <Remove /> : <Add />}
            </button>
          )}
          <div className="testUserInfo">
            <div className="userInfoProfile">
              <h4 className="rightbarTitle">User information</h4>
              <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">
                    City: <b>Nis</b>{" "}
                  </span>
                  <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">
                    From: <b>Serbia</b>
                  </span>
                  <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">
                    Birth: <b> 1.12.1999</b>
                  </span>
                  {/*<span className="rightbarInfoValue">
                  {user.relationship === 1
                    ? "Single"
                    : user.relationship === 1
                    ? "Married"
                  : "-"*}
                  </span> */}
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">
                    Studying:<b> Faculty of Metropolitan , Nis</b>
                  </span>
                  <span className="rightbarInfoValue">{user.from}</span>
                </div>
              </div>
            </div>
            <div className="userInfoFriendsProfile">
              <h4 className="rightbarTitle"> Friends</h4>
              <div className="rightbarFollowings">
                {friends.map((friend) => (
                  <Link
                    to={"/profile/" + friend.username}
                    style={{ textDecoration: "none", color: "gray" }}
                  >
                    <div className="rightbarFollowing">
                      <img
                        src={
                          friend.profilePicture
                            ? PF + friend.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="rightbarFollowingImg"
                      />
                      <span className="rightbarFollowingName">
                        {friend.username}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightside /> : <HomeRightside />}
      </div>
    </div>
  );
}
export default Rightside;
