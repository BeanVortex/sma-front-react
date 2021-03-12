import React, { Component } from "react";
import "./FullPost.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import  Comment  from './Comment/Comment';
import { Container, Card } from "react-bootstrap";
import axios from "axios";

export default class FullPost extends Component {
  state = {
    id: null,
    title: null,
    content: null,
    img: null,
    comments: null,
    loaded: false,
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      if (!this.state.loaded || this.state.id !== this.props.match.params.id) {
        axios({
          url: "api/post/" + this.props.match.params.id,
          method: "GET",
        }).then((response) => {
          console.log(response);
          this.setState({
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
  }

  render() {
    console.log(this.props);
    // let comments = this.state.comments.map((comment) => (
    //   <Comment key={comment.id}></Comment>
    // ));
    return (
      <Container>
        <Card className="card shadow-sm rounded-lg border-dark ">
          <Card.Header className="rounded-top-lg  py-1 bg-dark text-light">
            <Card.Title className="d-flex align-items-center m-0 p-2">
              {this.state.title}
            </Card.Title>
          </Card.Header>
          <Card.Img
            className="rounded-0 p-0 border-bottom "
            src={axios.defaults.baseURL + "/img/" + this.state.img}
            alt=""
          />

          <Card.Text className="p-2">{this.state.content}</Card.Text>
        </Card>
      </Container>
    );
  }
}
