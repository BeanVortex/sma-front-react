import axios from "axios";
import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
class NewComment extends Component {
  state = {
    sent: false,
    error: false,
  };
  postComment = () => {
    if (this.props.user.authenticated) {
      const content = document.getElementById("comment-content").value;
      console.log(this.props);
      const data = {
        content,
        post: {
          id: this.props.postId,
        },
        user: {
          id: this.props.user.userId,
        },
      };
      axios
        .post("/api/post/comment/", data)
        .then((res) => {
          this.setState({ sent: true });
        })
        .catch((err) => {
          this.setState({ sent: false, error: true });
        });
    }
  };

  render() {
    return (
      <Card className="shadow-sm rounded-lg mt-2 border-primary">
        <Form>
          <Form.Group className="d-flex flex-column align-items-center p-2">
            <textarea
              type="textarea"
              rows="5"
              id="comment-content"
              placeholder="Your comment"
              className="form-control mb-2"
            />
            <input
              type="button"
              className="btn btn-success mt-2"
              value="send"
              onClick={this.postComment}
            />
          </Form.Group>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(NewComment);
