import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../postThing/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstace } from "../../config";

import Aos from "aos";
function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  })

  useEffect(() => {
    //ovde fetchujem postove
    const fetchPosts = async () => {
      const res = username
        ? await axiosInstace.get("/posts/profile/" + username)
        : await axiosInstace.get("posts/timeline/" + user._id); //ovo sluzi da prikaze postove samo onih korisnika koje korisnik prati ukljucujuci logiku iz Post.jsx sa dodatim PF env-om
      setPosts(
        //sortiramo postove da post koji je postavljen zadnji bude na vrhu
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="testffed" >
        <div className="feedWrapper" >
          {(!username || username === user.username) && <Share />}{" "}
          {/* ako nema useraname i ako ga ima onda stavi share*/}
          {/* logika za nestajanje post componente tj forme za postavljanje posta u drugim profilima osim u userov*/}
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Feed;
