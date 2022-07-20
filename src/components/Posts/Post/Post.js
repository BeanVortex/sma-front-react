import React from "react";
import "./Post.scss";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const Post = (props) => {
  return (
    <Container className="p-lg-1 p-0 m-0">
      <Card className="card shadow-sm rounded-lg border-dark ">
        <Card.Header className="rounded-top-lg  py-1 bg-dark text-light">
          <Card.Title className="d-flex align-items-center m-0 p-2">
            {props.title}
          </Card.Title>
        </Card.Header>
        <Card.Img
          className="rounded-0 p-0 border-bottom "
          src={axios.defaults.baseURL + "/img/posts/" + props.img}
          alt=""
        />

        <Card.Text className="p-2">{props.content}</Card.Text>
      </Card>
    </Container>
  );
};
export default Post;
