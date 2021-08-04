import React, { useState, useContext, useEffect } from "react";
import "./Posts.scss";
import Post from "./Post/Post";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CardColumns from "react-bootstrap/CardColumns";
import { redirect } from "../../Utils/AuthUtil";
import { AuthContext } from "../../context/AuthContext";

const Posts = (props) => {
  const { userAuth } = useContext(AuthContext);
  const [posts, setPosts] = useState({
    posts: null,
    fetched: false,
  });

  useEffect(() => {
    if (userAuth.authenticated && !posts.fetched) {
      axios
        .get(`/api/post/user/${userAuth.userId}/`)
        .then((response) => {
          setPosts({ posts: response.data, fetched: true });
        })
        .catch((err) => {});
    }
  }, [userAuth.authenticated, posts.fetched]);

  let finalPosts = "";
  if (posts != null && posts != "") {
    finalPosts = posts.content.map((post) => (
      <Link key={post.id} to={"posts/" + post.id}>
        <Post img={post.image} title={post.title} content={post.content} />
      </Link>
    ));
  }

  return (
    <CardColumns>
      {redirect(userAuth.authenticated)}
      {finalPosts}
    </CardColumns>
  );
};
