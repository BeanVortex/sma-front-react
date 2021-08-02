import React, { useState, useEffect } from "react";
import "./Discover.scss";
import CardColumns from "react-bootstrap/CardColumns";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "../Posts/Post/Post";

const Discover = props =>{

  const [posts, setPosts] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchPosts = () => {
    if (!fetched) {
      axios.get("/api/post/all/").then((response) => {
        setPosts(response.data);
        setFetched(true);
      });
    }
  };

  useEffect(()=>{
    fetchPosts();
    console.log("UseEffect");
  }, []);

  let postList = "";
  if (posts != null && posts != "") {
    postList = posts.content.map((post) => (
      <Link key={post.id} to={"posts/" + post.id}>
        <Post img={post.image} title={post.title} content={post.content} />
      </Link>
    ));
  }

  return <CardColumns>{postList}</CardColumns>;

}

export default Discover;