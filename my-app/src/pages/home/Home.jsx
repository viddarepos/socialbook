import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/leftside/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightside from "../../components/rightside/Rightside";
import "./home.css";



function Home() {
  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightside />
      </div>
    </>
  );
}

export default Home;
