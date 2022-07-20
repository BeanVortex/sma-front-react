import React from "react";

export default Comment = (props) => {
  return <p className="border-bottom pb-5">{props.comment.content}</p>;
}