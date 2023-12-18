import React, { useContext, useRef, useState } from "react";
import "./share.css";
import {
  AddAPhoto,
  Label,
  Room,
  EmojiEmotions,
  NoEncryption,
  Cancel,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstace } from "../../config";
import axios from "axios";

function Share() {
  const { user } = useContext(AuthContext); // current user
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const description = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: description.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axiosInstace.post("/upload", data);
      } catch (err) { }
    }
    try {
      await axiosInstace.post("/posts", newPost);
      window.location.reload();
    } catch (err) { }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            placeholder={"Share your memories " + user.username + "..."}
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              {/* stavljam labelu umesto diva i pisem htmlFor = "file" dok je file input ispod */}
              <AddAPhoto htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])} //metoda znaci da dodam fajlove dok ovo [0] znaci da se doda samo jedan fajl a ne svi tj da mozes samo jedan da dodas
              />
            </label>
  
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Emoji</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
export default Share;
