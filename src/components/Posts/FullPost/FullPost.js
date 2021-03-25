import React, { Component } from "react";
import "./FullPost.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import NewComment from "../../Comment/NewComment/NewComment";
import Comments from "../../Comment/Comments";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
class FullPost extends Component {
  state = {
    id: null,
    title: null,
    content: null,
    img: null,
    comments: null,
    loaded: false,
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.match.params.id) {
      if (!this.state.loaded || this.state.id !== this.props.match.params.id) {
        axios({
          url: `api/post/${this.props.match.params.id}/`,
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

    if (this.state.loaded) {
    
      return (
        <Container>
          <Card className="card shadow-sm rounded-lg border-dark ">
            <Card.Img
              className=" p-1 rounded-lg border-bottom "
              src={axios.defaults.baseURL + "/img/posts/" + this.state.img}
              alt=""
            />

            <Card.Title className="d-flex align-items-center m-0 p-2">
              {this.state.title}
            </Card.Title>
            <Card.Text className="p-2">{this.state.content}</Card.Text>
          </Card>

          <NewComment className="mt-2 mb-2"/>

          <Comments/>
        </Container>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FullPost);
