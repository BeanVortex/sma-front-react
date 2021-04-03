import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "./Comment/Comment";
import * as actionTypes from "../../../store/actions/actionTypes";
class Comments extends Component {
  state = {
    comments: this.props.comments,
  };

  componentDidUpdate() {
    if (!this.props.comment.received) {
      this.props.receive();
      this.setState({ comments: this.props.comments });
    }
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    receive: () =>
      dispatch({
        type: actionTypes.NEW_COMMENT,
        received: true
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
