import React, { Component } from "react";
import "./Post.scss";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

export default class Post extends Component {
  render() {
    return (
      <Container className="p-lg-1 p-0 m-0">

          <Card className="card shadow-sm rounded-lg border-dark ">
            <Card.Header className="rounded-top-lg  py-1 bg-dark text-light">
              <Card.Title className="d-flex align-items-center m-0 p-2">
                {this.props.title}
              </Card.Title>
            </Card.Header>
            <Card.Img
              className="rounded-0 p-0 border-bottom "
              src={axios.defaults.baseURL + "/img/posts/" + this.props.img}
              alt=""
            />

            <Card.Text className="p-2">{this.props.content}</Card.Text>
          </Card>
      

      </Container>
    );
  }
}
