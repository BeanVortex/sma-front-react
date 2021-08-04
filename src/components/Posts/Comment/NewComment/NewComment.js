import axios from "axios";
import React, { useState, useContext } from "react";
import { Card, Form } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";

const NewComment = (props) => {
  const [state, setState] = useState({ sent: false, error: false });
  const { userAuth } = useContext(AuthContext);

  const postComment = () => {
    if (userAuth.authenticated) {
      const content = document.getElementById("comment-content").value;
      const data = {
        content,
        post: {
          id: props.postId,
        },
        user: {
          id: userAuth.userId,
        },
      };
      axios
        .post("/api/post/comment/", data)
        .then((res) => {
          setState({ sent: true });
        })
        .catch((err) => {
          setState({ sent: false, error: true });
        });
    }
  };

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
            onClick={postComment}
          />
        </Form.Group>
      </Form>
    </Card>
  );
};

export default NewComment;
