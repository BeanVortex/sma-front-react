import React, { useState, useEffect } from "react";
import Comment from "./Comment/Comment";

const Comments = (props) => {
  const [state, setState] = useState({
    comments: [],
    loaded: false,
  });

  useEffect(
    () => setState({ comments: props.comments, loaded: true }),
    []
  );

  if (state.loaded) {
    const comments = state.comments.map((comment, index) => (
      <Comment key={index} comment={comment} />
    ));
    return (
      <div className="mt-4 border rounded border-warning p-2">{comments}</div>
    );
  }
  return null;
};

export default Comments;
