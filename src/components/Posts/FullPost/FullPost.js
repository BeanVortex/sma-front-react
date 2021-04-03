import React, { Component } from "react";
import "./FullPost.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import NewComment from "../Comment/NewComment/NewComment";
import Comments from "../Comment/Comments";
import { Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { redirect } from "../../../Utils/AuthUtil";

import * as actionTypes from '../../../store/actions/actionTypes';
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
    this.fetchData();
    console.log(this.props);
  }

  componentDidUpdate() {
    if(!this.props.comment.reloaded){
      this.fetchData();
    }
  }

  fetchData = () => {
    if (this.props.match.params.id) {
      if (this.state.id !== this.props.match.params.id) {
        axios({
          url: `api/post/${this.props.match.params.id}/`,
          method: "GET",
        }).then((response) => {
          this.props.reload();
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
  };

  //TODO
  render() {
    if (this.state.loaded) {
      return (
        <Container>
          {redirect(this.props.user.authenticated)}
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

          <NewComment
            updateComponent={this.componentDidUpdate}
            postId={this.state.id}
            className="mt-2"
          />

          <Comments comments={this.state.comments} postId={this.state.id} />
        </Container>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    reload: () => dispatch({type: actionTypes.NEW_COMMENT, posted: false, reloaded: true})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
