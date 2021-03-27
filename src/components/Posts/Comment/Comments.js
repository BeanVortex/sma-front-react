import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Comment from "./Comment/Comment";
class Comments extends Component {
  state = {
    comments: this.props.comments,
  };

  render() {
    const comments = this.state.comments.map((comment, index) => (
      <Comment key={index} comment={comment} />
    ));
    return (
      <div className="mt-4 border rounded border-warning p-2">{comments}</div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Comments);
