import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "./Comment/Comment";
import * as actionTypes from "../../../store/actions/actionTypes";
class Comments extends Component {
  state = {
    comments: [],
    loaded: false,
  };

  componentDidMount() {
    this.setState({ comments: this.props.comments, loaded: true });
  }


  render() {
    if (this.state.loaded) {
      const comments = this.state.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ));
      return (
        <div className="mt-4 border rounded border-warning p-2">{comments}</div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => state;


export default connect(mapStateToProps)(Comments);
