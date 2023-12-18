import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstace } from "../../config";
import Aos from "aos";
function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext); //:currentUser znaci da user koristim kao currentUsera

  useEffect(() => {
    Aos.init({ duration: 1000 });
  })
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstace.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id)); //ako sadrzi bice true ako ne sadrzi bice false i ovo sluzi da se zna kad je neki korisnik lajkovao post i kad je dislajkovao
  }, [currentUser._id, post.likes]); //dependecies

  const likeHandler = () => {
    try {
      axiosInstace.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}

    {
      /*ako je lajkovano (misli se da je vec lajkovano) onda ga smanji ako se klikne a ako nije onda povecaj lajk*/
    }
    setLike(isLiked ? like - 1 : like + 1);
    {
      /*posto je isliked idalje false onda moramo staviti da nije i na taj nacin se prekida beskonacna petlja odosno beskonacni lajk tj korisnik moze da lajkuje samo jednom*/
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="post" data-aos ="fade-up">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
              {/*post? ovaj upitnik sluzi zato sto ne postoji diskripcija za svakog korisnika u dummyData*/}
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImage" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
