import React, { Component } from "react";
import { Form } from "react-bootstrap";

class NewComment extends Component {
  render() {
    return (
      <Card className="card shadow-sm rounded-lg mt-2">
        <Form>
          <Form.Group>
            <input type="text" id="comment_content" placeholder="Your comment" className="form-control mb-2"/>
          </Form.Group>
        </Form>
      </Card>
    );
  }
}

export default NewComment;
