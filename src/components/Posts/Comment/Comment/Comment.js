import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    return <p className="border-bottom pb-5">{this.props.comment.content}</p>;
  }
}
