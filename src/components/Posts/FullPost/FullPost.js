import React, { useState, useContext, useEffect } from "react";
import "./FullPost.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import NewComment from "../Comment/NewComment/NewComment";
import Comments from "../Comment/Comments";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { redirect } from "../../../Utils/AuthUtil";
import { AuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";

const FullPost = () => {
  const { userAuth } = useContext(AuthContext);
  const { postId } = useParams();

  const [post, setPost] = useState({
    id: null,
    title: null,
    content: null,
    img: null,
    comments: null,
    loaded: false,
  });

  useEffect(() => {
    //fetch data
    console.log(postId);
    if (postId) {
      if (post.id !== postId) {
        axios({
          url: `api/post/${postId}/`,
          method: "GET",
        }).then((response) => {
          setPost({
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            img: response.data.image,
            comments: response.data.comments,
            loaded: true,
          });
        });
      }
    }
  }, []);

  if (post.loaded) {
    return (
      <Container>
        {redirect(userAuth.authenticated)}
        <Card className="card shadow-sm rounded-lg border-dark ">
          <Card.Img
            className=" p-1 rounded-lg border-bottom "
            src={axios.defaults.baseURL + "/img/posts/" + post.img}
            alt=""
          />

          <Card.Title className="d-flex align-items-center m-0 p-2">
            {post.title}
          </Card.Title>
          <Card.Text className="p-2">{post.content}</Card.Text>
        </Card>

        <NewComment postId={post.id} className="mt-2" />

        <Comments postId={post.id} />
      </Container>
    );
  } else {
    return redirect(userAuth.authenticated);
  }
};

export default FullPost;
